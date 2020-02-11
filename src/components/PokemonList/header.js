import React from 'react'
import { useStore } from 'store'
import { useHistory } from 'react-router-dom'

import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },

    divider: {
        height: 28,
        margin: 4,
    },
}))

const SearchAppBar = () => {
    const history = useHistory()
    const classes = useStyles()
    const { pokemonStore } = useStore()
    const [value, setValue] = React.useState('')

    const updatePagination = value => {
        pokemonStore.updatePagination({ search: value }) && history.push('/page/1')
    }

    const handleSubmit = e => {
        if (e.key != 'Enter') {
            return
        }
        updatePagination(value)
    }

    const handleChange = e => {
        setValue(e.target.value)
        if (e.target.value) {
            return
        }
        updatePagination('')
    }

    return (
        <Toolbar>
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    onKeyDown={handleSubmit}
                    placeholder="Search…"
                    value={value}
                    type="search"
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'search' }}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} onClick={updatePagination.bind(null, value)}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Toolbar>
    )
}

export default SearchAppBar
