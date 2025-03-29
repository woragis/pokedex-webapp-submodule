export interface Pokemon {
  name: string
  url: string
}

export type Sprites = {
  front_default: string
  front_shiny: string
}

export type TypeName =
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

export interface PokemonType {
  type: {
    name: TypeName
    url: string
  }
}

export interface PokemonData {
  name: string
  id: number
  sprites: Sprites
  types: PokemonType[]
}

export type PokemonsInitialState = {
  pokemonsList: Pokemon[]
  pokemons: PokemonData[]
  searchedPokemons: PokemonData[]
}

export interface PokemonsRequest {
  results: Pokemon[]
}

export interface Type {
  name: string
  url: string
}

export type TypesSprites = {
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

export type TypesInitialState = {
  typesList: Type[]
  typesData: TypeData[]
}

export interface TypesRequest {
  results: Type[]
}
