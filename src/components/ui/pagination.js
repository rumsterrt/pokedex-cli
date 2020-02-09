import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import _uniq from 'lodash/uniq'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

const fetchPageNumbers = (count, page) => {
    return _uniq([1, 2, +page - 1, +page, +page + 1, count - 1, count]).reduce((acc, item, index, arr) => {
        if (item <= 0 || item > count) {
            return acc
        }
        if (index > 0 && item != arr[index - 1] + 1) {
            return [...acc, '...', item]
        }
        return [...acc, item]
    }, [])
}

const Pagination = ({ total, limit, currentPage, onClick = () => {} }) => {
    const history = useHistory()
    const [pages, setPages] = React.useState([])

    React.useEffect(() => {
        setPages(fetchPageNumbers(Math.round(total / limit), currentPage))
    }, [total, limit, currentPage])

    return (
        <Box display="flex">
            {pages.map((page, index) => (
                <Button disabled={page == currentPage || page == '...'} key={index} onClick={onClick.bind(null, page)}>
                    {page}
                </Button>
            ))}
        </Box>
    )
}

export default Pagination
