import React from 'react'

import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

const StyledFormControl = styled(FormControl)`
    min-width: 120px;
`

export default ({ style, name, options, hint, label, value, onChange, multiple, ...props }) => (
    <StyledFormControl {...props}>
        {label && <InputLabel id={name}>{label}</InputLabel>}
        <Select value={value} onChange={onChange} labelId={name} id={name} multiple={multiple}>
            {options &&
                options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
        </Select>
    </StyledFormControl>
)
