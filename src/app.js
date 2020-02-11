import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Loader } from 'components/ui'

import Container from '@material-ui/core/Container'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const PokemonList = React.lazy(() => import('./components/PokemonList'))

const App = () => {
    const matches = useMediaQuery('(min-width:600px)')
    return (
        <HashRouter>
            <Container maxWidth={matches ? 'lg' : false} disableGutters={!matches}>
                <React.Suspense fallback={<Loader />}>
                    <Switch>
                        <Route
                            path="/page/:num"
                            exact
                            render={ownProps => <PokemonList {...ownProps} page={ownProps.match.params.num} />}
                        />
                        <Redirect exact from="/" to="/page/" />
                        <Redirect to="/page/1" />
                    </Switch>
                </React.Suspense>
            </Container>
        </HashRouter>
    )
}

export default App
