import React from 'react'
import { useLocalStore } from 'mobx-react-lite'
import PokemonStore from './pokemon'

const storeContext = React.createContext()

export const StoreProvider = ({ children }) => {
    const store = useLocalStore(() => ({ pokemonStore: PokemonStore() }))
    return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

export const useStore = () => {
    const store = React.useContext(storeContext)
    if (!store) {
        // this is especially useful in TypeScript so you don't need to be checking for null all the time
        throw new Error('useStore must be used within a StoreProvider.')
    }
    return store
}
