import React from 'react'
import ReactDOM from 'react-dom'
import { StoreProvider } from 'store'
import App from './app'

import CssBaseline from '@material-ui/core/CssBaseline'

const Root = () => (
    <StoreProvider>
        <CssBaseline />
        <App />
    </StoreProvider>
)

ReactDOM.render(<Root />, document.querySelector('#root'))
