import { typesRoute } from '@/constants/pokeapi'
import { Store } from '@tanstack/react-store'
import axios from 'axios'
import {
  Type,
  TypeData,
  TypesInitialState,
  TypesRequest,
} from './types/pokemon'
import { useQuery } from '@tanstack/react-query'

const pokemonInitialState: TypesInitialState = {
  typesList: [],
  typesData: [],
}
export const typesStore = new Store(pokemonInitialState)

export const fetchTypesList = async () => {
  try {
    const { data } = await axios.get<TypesRequest>(typesRoute)
    typesStore.setState((state) => ({ ...state, typesList: data.results }))
    return data.results
  } catch (e) {
    console.error(e)
  }
}

export const fetchTypesData = async (types: Type[]) => {
  try {
    const typesData: TypeData[] = []
    for await (const type of types) {
      const { data } = await axios.get<TypeData>(type.url)
      typesData.push(data)
    }

    typesStore.setState((state) => ({ ...state, typesData }))
  } catch (e) {
    console.error(e)
  }
}

// ✅ Use React Query to fetch the list of Pokémon types
export const useTypesList = () => {
  return useQuery({
    queryKey: ['typesList'],
    queryFn: async () => {
      const { data } = await axios.get<TypesRequest>(typesRoute)
      typesStore.setState((state) => ({ ...state, typesList: data.results }))
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
      typesStore.setState((state) => ({ ...state, typesData }))
      return typesData
    },
    enabled: !!types, // Only run when `types` is available
    staleTime: 1000 * 60 * 5,
  })
}
