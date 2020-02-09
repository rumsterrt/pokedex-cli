import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor: 'white',
        color: 'black',
    },
    body: {
        marginTop: '20px',
    },
}))

const Page = ({ header, children }) => {
    const classes = useStyles()

    return (
        <>
            {header && (
                <AppBar position="sticky" className={classes.appBar}>
                    <Toolbar>{header}</Toolbar>
                </AppBar>
            )}
            <div className={classes.body}>{children}</div>
        </>
    )
}

export default Page
