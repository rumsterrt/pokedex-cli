import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import PokemonList from './components/PokemonList'

import Container from '@material-ui/core/Container'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const App = () => {
    const matches = useMediaQuery('(min-width:600px)')
    return (
        <HashRouter>
            <Container maxWidth={matches ? 'lg' : false} disableGutters={!matches}>
                <Switch>
                    <Route
                        path="/page/:num"
                        exact
                        render={ownProps => <PokemonList {...ownProps} page={ownProps.match.params.num} />}
                    />
                    <Redirect exact from="/" to="/page/" />
                    <Redirect to="/page/1" />
                </Switch>
            </Container>
        </HashRouter>
    )
}

export default App
