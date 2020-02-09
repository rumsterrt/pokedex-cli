import React from 'react'
import ReactDOM from 'react-dom'
import { StoreProvider } from 'store'

import CssBaseline from '@material-ui/core/CssBaseline'

const Root = () => (
    <StoreProvider>
        <CssBaseline />
    </StoreProvider>
)

ReactDOM.render(<Root />, document.querySelector('#root'))
