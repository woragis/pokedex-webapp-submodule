import { pokemonsRoute, typesRoute } from '@/constants/pokeapi'
import { Store } from '@tanstack/react-store'
import axios from 'axios'
import {
  Pokemon,
  PokemonData,
  PokemonsInitialState,
  PokemonsRequest,
  Type,
  TypeData,
  TypesRequest,
} from './types/pokemon'
import { useQuery } from '@tanstack/react-query'

const pokemonInitialState: PokemonsInitialState = {
  pokemons: {
    data: [],
    list: [],
    search: [],
  },
  types: {
    data: [],
    list: [],
  },
}

export const pokemonStore = new Store(pokemonInitialState)

export const pokemonStoreDispatch = {
  fetchPokemonsList: async () => {
    try {
      const { data } = await axios.get<PokemonsRequest>(pokemonsRoute)
      pokemonStore.setState((state) => ({
        ...state,
        pokemons: { ...state.pokemons, list: data.results },
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

      pokemonStore.setState((state) => ({
        ...state,
        pokemons: { ...state.pokemons, data: pokemonsData },
      }))
    } catch (e) {
      console.error(e)
    }
  },
  setSearchedPokemonsDataToRandom: async () => {
    const pokemonsData = pokemonStore.state.pokemons.data
    if (pokemonsData) {
      const randomPokemons = pokemonsData
        .sort(() => Math.random() - Math.random())
        .slice(0, 20)

      pokemonStore.setState((state) => ({
        ...state,
        pokemons: { ...state.pokemons, search: randomPokemons },
      }))
    }
  },
  getSprite: (pokemonData: PokemonData) => {
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
        pokemons: { ...state.pokemons, list: data.results },
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
      pokemonStore.setState((state) => ({
        ...state,
        pokemons: { ...state.pokemons, data: pokemonsData },
      }))
      return pokemonsData
    },
    enabled: !!pokemons, // Only run when `pokemons` is available
    staleTime: 1000 * 60 * 5,
  })
}

// ✅ Use React Query to fetch the list of Pokémon types
export const useTypesList = () => {
  return useQuery({
    queryKey: ['typesList'],
    queryFn: async () => {
      const { data } = await axios.get<TypesRequest>(typesRoute)
      pokemonStore.setState((state) => ({
        ...state,
        types: { ...state.types, list: data.results },
      }))
      return data.results
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  })
}

// ✅ Use React Query to fetch detailed type data
export const useTypesData = (types: Type[] | undefined) => {
  return useQuery({
    queryKey: ['typesData', types?.length],
    queryFn: async () => {
      if (!types) return []
      const typesData: TypeData[] = await Promise.all(
        types.map(async (type) => {
          const { data } = await axios.get<TypeData>(type.url)
          return data
        })
      )
      pokemonStore.setState((state) => ({
        ...state,
        types: { ...state.types, data: typesData },
      }))
      return typesData
    },
    enabled: !!types, // Only run when `types` is available
    staleTime: 1000 * 60 * 5,
  })
}
