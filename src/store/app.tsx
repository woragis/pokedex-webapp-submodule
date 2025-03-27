import { Store } from '@tanstack/react-store'

const appInitialState = {
  loading: false,
}

const appStore = new Store(appInitialState)

export const setLoading = (loading: boolean) => {
  appStore.setState((state) => ({ ...state, loading }))
}
