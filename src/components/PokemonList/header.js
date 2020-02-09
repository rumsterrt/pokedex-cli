import React from 'react'
import { useHistory } from 'react-router-dom'
import _get from 'lodash/get'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Drawer from '@material-ui/core/Drawer'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'

import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const useStyles = makeStyles(theme => ({}))

const Header = () => {
    return (
        <>
            <div>Header</div>
        </>
    )
}

export default Header
