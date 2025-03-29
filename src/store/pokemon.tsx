import { pokemonsRoute } from '@/constants/pokeapi'
import { Store } from '@tanstack/react-store'
import axios from 'axios'
import {
  Pokemon,
  PokemonData,
  PokemonsInitialState,
  PokemonsRequest,
} from './types/pokemon'
import { useQuery } from '@tanstack/react-query'

const pokemonInitialState: PokemonsInitialState = {
  pokemonsList: [],
  pokemons: [],
  searchedPokemons: [],
}

export const pokemonStore = new Store(pokemonInitialState)

export const pokemonStoreDispatch = {
  fetchPokemonsList: async () => {
    try {
      const { data } = await axios.get<PokemonsRequest>(pokemonsRoute)
      pokemonStore.setState((state) => ({
        ...state,
        pokemonsList: data.results,
      }))
      return data.results
    } catch (e) {
      console.error(e)
    }
  },
  fetchPokemonsData: async (pokemons: Pokemon[]) => {
    try {
      const pokemonsData: PokemonData[] = []
      for await (const pokemon of pokemons) {
        const data = await axios.get<PokemonData>(pokemon.url)
        pokemonsData.push(data.data)
      }

      pokemonStore.setState((state) => ({ ...state, pokemons: pokemonsData }))
    } catch (e) {
      console.error(e)
    }
  },
  setSearchedPokemonsDataToRandom: async () => {
    const pokemonsData = pokemonStore.state.pokemons
    if (pokemonsData) {
      const randomPokemons = pokemonsData
        .sort(() => Math.random() - Math.random())
        .slice(0, 20)

      pokemonStore.setState((state) => ({
        ...state,
        searchedPokemons: randomPokemons,
      }))
    }
  },
  getDefaultSprite: (pokemonData: PokemonData) => {
    return pokemonData.sprites.front_default
  },
  getShinySprite: (pokemonData: PokemonData) => {
    return pokemonData.sprites.front_shiny
  },
}

// ✅ Use React Query to fetch the initial list of Pokémon
export const useInitialPokemonData = () => {
  return useQuery({
    queryKey: ['pokemonsList'],
    queryFn: async () => {
      const { data } = await axios.get<{ results: Pokemon[] }>(pokemonsRoute)
      pokemonStore.setState((state) => ({
        ...state,
        pokemonsList: data.results,
      }))
      return data.results
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  })
}

// ✅ Use React Query to fetch detailed Pokémon data
export const usePokemonData = (pokemons: Pokemon[] | undefined) => {
  return useQuery({
    queryKey: ['pokemonsData', pokemons?.length],
    queryFn: async () => {
      if (!pokemons) return []
      const pokemonsData: PokemonData[] = await Promise.all(
        pokemons.map(async (pokemon) => {
          const { data } = await axios.get<PokemonData>(pokemon.url)
          return data
        })
      )
      pokemonStore.setState((state) => ({ ...state, pokemons: pokemonsData }))
      return pokemonsData
    },
    enabled: !!pokemons, // Only run when `pokemons` is available
    staleTime: 1000 * 60 * 5,
  })
}
