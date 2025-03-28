import { typesRoute } from '@/constants/pokeapi'
import { Store } from '@tanstack/react-store'
import axios from 'axios'

interface Type {
  name: string
  url: string
}

type TypesSprites = {
  'generation-viii': {
    'sword-shield': {
      name_icon: string
    }
  }
}

export interface TypeData {
  name: string
  id: number
  sprites: TypesSprites
}

type TypesInitialState = {
  typesList: Type[]
  typesData: TypeData[]
}

const pokemonInitialState: TypesInitialState = {
  typesList: [],
  typesData: [],
}

interface TypesRequest {
  results: Type[]
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
