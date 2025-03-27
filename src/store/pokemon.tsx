import { pokemonsRoute } from '@/constants/pokeapi'
import { Store } from '@tanstack/react-store'
import axios from 'axios'

interface Pokemon {
  name: string
  url: string
}
type PokemonsInitialState = Pokemon[]
const pokemonInitialState: PokemonsInitialState = []
export const pokemonStore = new Store(pokemonInitialState)

export const genInitialPokemonData = async () => {
  try {
    interface PokemonsRequest {
      results: Pokemon[]
    }
    const { data } = await axios.get<PokemonsRequest>(pokemonsRoute)
    pokemonStore.setState(() => data.results)
  } catch (e) {
    console.log(e)
  }
}
