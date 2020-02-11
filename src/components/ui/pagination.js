import React from 'react'
import styled, { css } from 'styled-components'
import _uniq from 'lodash/uniq'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import NavigatePrev from '@material-ui/icons/NavigateBefore'
import NavigateNext from '@material-ui/icons/NavigateNext'
import NavigateFirst from '@material-ui/icons/SkipPrevious'
import NavigateLast from '@material-ui/icons/SkipNext'

const StyledIconButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    ${props =>
        !props.disabled &&
        css`
            &:hover svg {
                cursor: pointer;
                fill: violet;
            }
        `}
`

const IconButton = ({ Icon, disabled, onClick = () => {}, ...props }) => {
    return (
        <StyledIconButton disabled={disabled} {...props}>
            <Icon fontSize="large" color={disabled ? 'disabled' : 'inherit'} onClick={() => disabled || onClick()} />
        </StyledIconButton>
    )
}

const Pagination = ({ totalPages, limit, currentPage, onClick = () => {}, ...rest }) => (
    <Box display="flex" alignItems="center" justifyContent="center" {...rest}>
        <IconButton disabled={currentPage == 1} Icon={NavigateFirst} onClick={onClick.bind(null, 1)} />
        <IconButton disabled={currentPage == 1} Icon={NavigatePrev} onClick={onClick.bind(null, +currentPage - 1)} />
        <Typography component="h2">{currentPage}</Typography>
        <IconButton
            disabled={currentPage == totalPages}
            Icon={NavigateNext}
            onClick={onClick.bind(null, +currentPage + 1)}
        />
        <IconButton disabled={currentPage == totalPages} Icon={NavigateLast} onClick={onClick.bind(null, totalPages)} />
    </Box>
)

export default Pagination
