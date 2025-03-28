import { pokemonsRoute } from '@/constants/pokeapi'
import { Store } from '@tanstack/react-store'
import axios from 'axios'

interface Pokemon {
  name: string
  url: string
}

type Sprites = {
  // back_default: string
  // back_shiny: string
  front_default: string
  front_shiny: string
}

type TypeName =
  | 'normal' // 1
  | 'fire' // 2
  | 'water' // 3
  | 'grass' // 4
  | 'steel' // 5
  | 'psychic' // 6
  | 'ghost' // 7
  | 'fairy' // 8
  | 'ground' // 9
  | 'rock' // 10
  | 'electric' // 11
  | 'fighting' // 12
  | 'flying' // 13
  | 'dark' // 14
  | 'dragon' // 15
  | 'ice' // 16
  | 'poison' // 17
  | 'bug' // 18
  | 'steelar' // 19
  | 'unknown' // 20
  | 'shadow' // 21

interface Type {
  type: {
    name: TypeName
    url: string
  }
}

export interface PokemonData {
  name: string
  id: number
  sprites: Sprites
  types: Type[]
}

type PokemonsInitialState = {
  pokemonsList: Pokemon[]
  pokemons: PokemonData[]
  searchedPokemons: PokemonData[]
}

const pokemonInitialState: PokemonsInitialState = {
  pokemonsList: [],
  pokemons: [],
  searchedPokemons: [],
}

export const pokemonStore = new Store(pokemonInitialState)

export const genInitialPokemonData = async () => {
  try {
    interface PokemonsRequest {
      results: Pokemon[]
    }
    const { data } = await axios.get<PokemonsRequest>(pokemonsRoute)
    pokemonStore.setState((state) => ({ ...state, pokemonsList: data.results }))
    return data.results
  } catch (e) {
    console.error(e)
  }
}

export const fetchPokemonsData = async (pokemons: Pokemon[]) => {
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
}

export const setSearchedPokemonsDataToRandom = async () => {
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
}

export const getPokemonDefaultSprite = (pokemonData: PokemonData) => {
  try {
    const pokemonSpriteUrl = pokemonData.sprites.front_default
    return pokemonSpriteUrl
  } catch (e) {
    console.error(e)
  }
}

export const getPokemonShinySprite = (pokemonData: PokemonData) => {
  try {
    const pokemonSpriteUrl = pokemonData.sprites.front_shiny
    return pokemonSpriteUrl
  } catch (e) {
    console.error(e)
  }
}

export const getPokemonTypes = (pokemonData: PokemonData) => {
  return pokemonData.types
}
