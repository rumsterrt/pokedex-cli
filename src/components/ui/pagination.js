import React from 'react'
import styled from 'styled-components'
import _uniq from 'lodash/uniq'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import NavigatePrev from '@material-ui/icons/NavigateBefore'
import NavigateNext from '@material-ui/icons/NavigateNext'
import NavigateFirst from '@material-ui/icons/SkipPrevious'
import NavigateLast from '@material-ui/icons/SkipNext'

const Pagination = ({ totalPages, limit, currentPage, onClick = () => {}, ...rest }) => {
    const isDisabledLeft = currentPage == 1
    const isDisabledRight = currentPage == totalPages

    return (
        <Box display="flex" alignItems="center" justifyContent="center" {...rest}>
            <NavigateFirst
                color={isDisabledLeft ? 'disabled' : 'inherit'}
                onClick={() => isDisabledLeft || onClick(1)}
            />
            <NavigatePrev
                color={isDisabledLeft ? 'disabled' : 'inherit'}
                onClick={() => isDisabledLeft || onClick(+currentPage - 1)}
            />
            {currentPage}
            <NavigateNext
                color={isDisabledRight ? 'disabled' : 'inherit'}
                onClick={() => isDisabledRight || onClick(+currentPage + 1)}
            />
            <NavigateLast
                color={isDisabledRight ? 'disabled' : 'inherit'}
                onClick={() => isDisabledRight || onClick(totalPages)}
            />
        </Box>
    )
}

export default Pagination
