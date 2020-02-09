import React from 'react'
import { Select } from 'components/ui'
import { useHistory } from 'react-router-dom'
import _uniq from 'lodash/uniq'

import { useStore } from 'store'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const fetchPageNumbers = (count, page, pageNeighbours) => {
    return _uniq([1, 2, +page - 1, +page, +page + 1, count - 1, count])
}

const perPageTypes = [10, 20, 50].map(item => ({ label: item, value: item }))

const Pagination = ({ pagination, currentPage }) => {
    const { pokemonStore } = useStore()
    const history = useHistory()
    const [pages, setPages] = React.useState([])

    React.useEffect(() => {
        setPages(fetchPageNumbers(Math.round(pagination.total / pagination.limit), currentPage, 0))
    }, [pagination, currentPage])

    return (
        <Box display="flex">
            <Select
                value={pagination.limit}
                onChange={e => pokemonStore.updatePagination({ limit: e.target.value })}
                label="Elems per page:"
                options={perPageTypes}
            />
            <Box display="flex">
                {pages.map((page, index) => (
                    <Button
                        key={index}
                        onClick={() => {
                            history.push(`/page/${page}`)
                        }}
                    >
                        {page}
                    </Button>
                ))}
            </Box>
        </Box>
    )
}

export default Pagination
