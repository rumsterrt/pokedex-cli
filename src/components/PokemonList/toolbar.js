import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Select, Pagination } from 'components/ui'
import { useHistory } from 'react-router-dom'

import { useStore } from 'store'

import Box from '@material-ui/core/Box'

const StyledWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: 15px 10px;

    @media (max-width: 600px) {
        & > *:not(:last-child) {
            margin-bottom: 20px;
        }
    }
`

const FilterWrapper = styled(Box)`
    display: flex;
    align-items: center;
    & > *:not(:last-child) {
        margin-right: 20px;
    }
    @media (max-width: 600px) {
        justify-content: space-between;
    }
`

const perPageTypes = [10, 20, 50].map(item => ({ label: item, value: item }))

const Toolbar = ({ pagination, currentPage }) => {
    const { pokemonStore } = useStore()
    const [types, setTypes] = React.useState([])
    const history = useHistory()

    return (
        <StyledWrapper>
            <FilterWrapper>
                <Select
                    value={pagination.limit}
                    onChange={e => {
                        pokemonStore.updatePagination({ limit: e.target.value }) && history.push('/page/1')
                    }}
                    label="Elems per page:"
                    options={perPageTypes}
                />

                <Select
                    value={types}
                    onChange={e => {
                        setTypes(e.target.value)
                        pokemonStore.updatePagination({ types: e.target.value }) && history.push('/page/1')
                    }}
                    label="Types"
                    multiple
                    options={pokemonStore.types.map(item => ({ label: item, value: item }))}
                />
            </FilterWrapper>
            <Pagination
                {...pagination}
                currentPage={currentPage}
                onClick={page => history.push(`/page/${page}`)}
                width="100%"
            />
        </StyledWrapper>
    )
}

export default observer(Toolbar)
