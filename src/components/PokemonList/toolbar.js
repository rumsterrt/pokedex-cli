import React from 'react'
import styled from 'styled-components'
import { Select, Pagination } from 'components/ui'
import { useHistory } from 'react-router-dom'

import { useStore } from 'store'

import Box from '@material-ui/core/Box'

const StyledWrapper = styled(Box)`
    padding: 0 10px;
    display: flex;
    width: 100%;
    margin: 15px 10px;
`

const perPageTypes = [10, 20, 50].map(item => ({ label: item, value: item }))

const Toolbar = ({ pagination, currentPage }) => {
    const { pokemonStore } = useStore()
    const history = useHistory()

    return (
        <StyledWrapper>
            <Select
                value={pagination.limit}
                onChange={e => pokemonStore.updatePagination({ limit: e.target.value })}
                label="Elems per page:"
                options={perPageTypes}
            />
            <Pagination {...pagination} currentPage={currentPage} onClick={page => history.push(`/page/${page}`)} />
        </StyledWrapper>
    )
}

export default Toolbar
