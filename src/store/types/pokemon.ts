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

type Ability = {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: 1 | 2 | 3
}
type Stat = {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}
type Move = {
  move: {
    name: string
    url: string
  }
  version_group_details: {
    level_learned_at: number
    move_learn_method: {
      name: string
      url: string
    }
    version_group: {
      name: string
      url: string
    }
  }[]
}
type Form = {
  name: string
  url: string
}
type Cry = {
  latest: string
}
export interface PokemonData {
  name: string
  id: number
  sprites: Sprites
  types: PokemonType[]

  weight: number
  height: number
  base_experience: number
  abilities: Ability[]
  stats: Stat[]
  moves: Move[]
  forms: Form[]
  cries: Cry
}

export type PokemonsInitialState = {
  pokemons: {
    list: Pokemon[]
    data: PokemonData[]
    search: PokemonData[]
    compare: PokemonData[]
  }
  types: {
    list: Type[]
    data: TypeData[]
  }
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

export interface TypesRequest {
  results: Type[]
}
