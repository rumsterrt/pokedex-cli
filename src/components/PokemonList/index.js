import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store'
import ElemView from './elemView'
import Header from './header'
import Toolbar from './toolbar'
import { Page } from 'components/ui'

import Grid from '@material-ui/core/Grid'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const PokemonList = ({ page = 0 }) => {
    const matches = useMediaQuery('(min-width:1024px)')
    const { pokemonStore } = useStore()
    const pagination = pokemonStore.getPagination(page)
    React.useEffect(() => {
        pokemonStore.loadAllItemsIfNeeded()
    }, [])

    if (!pagination.items) {
        return null
    }
    return (
        <Page header={<Header />}>
            <Toolbar pagination={pagination} currentPage={page} />
            <Grid container spacing={3}>
                {pagination.items.map(item => (
                    <Grid item key={item} xs={matches ? 4 : 12}>
                        <ElemView name={item} />
                    </Grid>
                ))}
            </Grid>
            <Toolbar pagination={pagination} currentPage={page} />
        </Page>
    )
}

export default observer(PokemonList)
