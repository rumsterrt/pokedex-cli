import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

const Page = ({ header, children }) => (
    <React.Fragment>
        {header && (
            <AppBar position="sticky">
                <Toolbar>{header}</Toolbar>
            </AppBar>
        )}
        <div style={{ marginTop: '20px' }}>{children}</div>
    </React.Fragment>
)

export default Page
