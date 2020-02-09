import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store'
import { Select } from 'components/ui'

import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
}))

const SearchAppBar = () => {
    const classes = useStyles()
    const { pokemonStore } = useStore()
    const [value, setValue] = React.useState('')
    const [types, setTypes] = React.useState([])
    const handleSubmit = e => {
        console.log('e', e.key)
        if (e.key != 'Enter') {
            return
        }
        pokemonStore.updatePagination({ search: value })
    }

    return (
        <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
                POKEDEX
            </Typography>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    onKeyDown={handleSubmit}
                    placeholder="Search…"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <Select
                value={types}
                onChange={e => {
                    setTypes(e.target.value)
                    pokemonStore.updatePagination({ types: e.target.value })
                }}
                label="Types"
                multiple
                options={pokemonStore.types.map(item => ({ label: item, value: item }))}
            />
        </Toolbar>
    )
}

export default observer(SearchAppBar)
