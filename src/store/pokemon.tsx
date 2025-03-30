import { pokemonsRoute, typesRoute } from '@/constants/pokeapi'
import { Store } from '@tanstack/react-store'
import axios from 'axios'
import {
  Pokemon,
  PokemonData,
  PokemonsInitialState,
  PokemonsRequest,
  PokemonType,
  Type,
  TypeData,
  TypeEffectiveness,
  TypesRequest,
} from './types/pokemon'
import { useQuery } from '@tanstack/react-query'

const pokemonInitialState: PokemonsInitialState = {
  pokemons: {
    data: [],
    list: [],
    search: [],
    compare: [],
  },
  types: {
    data: [],
    list: [],
  },
}

export const pokemonStore = new Store(pokemonInitialState)

export const pokemonStoreDispatch = {
  addToCompare: (pokemon: PokemonData) => {
    pokemonStore.setState((state) => {
      let newCompare = [...state.pokemons.compare]

      if (newCompare.length >= 2) {
        newCompare = [pokemon, newCompare[0]] // Keep the first, replace the second
      } else {
        newCompare.push(pokemon)
      }

      return {
        ...state,
        pokemons: {
          ...state.pokemons,
          compare: newCompare,
        },
      }
    })
  },
  removeFromCompare: (pokemon: PokemonData) => {
    pokemonStore.setState((state) => ({
      ...state,
      pokemons: {
        ...state.pokemons,
        compare: state.pokemons.compare.filter(
          (mons) => mons.id !== pokemon.id
        ),
      },
    }))
  },
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
  getTypeSprite: (type: string) => {
    return pokemonStore.state.types.data.find(
      (typeData) => typeData.name === type
    )?.sprites['generation-viii']['sword-shield'].name_icon
  },
  getPokemonTypeEffectiveness: (types: PokemonType[]): TypeEffectiveness => {
    const weaknesses = new Set<string>()
    const resistances = new Set<string>()
    const immunities = new Set<string>()
    const strengths = new Set<string>()

    types.forEach((type) => {
      console.log('type: ', type)
      const typeData = pokemonStore.state.types.data.find(
        (typeData) => typeData.name === type.type.name
      )?.damage_relations

      if (!typeData) return

      typeData.double_damage_from.forEach(({ name }) => weaknesses.add(name))
      typeData.half_damage_from.forEach(({ name }) => resistances.add(name))
      typeData.no_damage_from.forEach(({ name }) => immunities.add(name))
      typeData.double_damage_to.forEach(({ name }) => strengths.add(name))
    })

    // Remove immunities from weaknesses (if immune, it can't be weak)
    immunities.forEach((immuneType) => weaknesses.delete(immuneType))

    // Remove resistances from weaknesses (if resistant, it should not be weak)
    resistances.forEach((resistantType) => weaknesses.delete(resistantType))

    return {
      weakTo: Array.from(weaknesses),
      strongAgainst: Array.from(strengths),
      resistantTo: Array.from(resistances),
      immuneTo: Array.from(immunities),
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
