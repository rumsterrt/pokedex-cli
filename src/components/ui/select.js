import React from 'react'

import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'

const StyledFormControl = styled(FormControl)`
    min-width: 120px;
`

export default ({ style, name, options, hint, label, value, onChange, multiple, ...props }) => (
    <StyledFormControl {...props}>
        {label && <InputLabel id={name}>{label}</InputLabel>}
        <Select
            value={value}
            onChange={onChange}
            labelId={name}
            id={name}
            multiple={multiple}
            renderValue={selected =>
                multiple ? selected.slice(0, 3).join(', ') + (selected.length > 3 ? '...' : '') : selected
            }
        >
            {options &&
                options.map((option, index) =>
                    !multiple ? (
                        <MenuItem key={index} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ) : (
                        <MenuItem key={index} value={option.value}>
                            <Checkbox checked={value.indexOf(option.value) > -1} />
                            <ListItemText primary={option.value} />
                        </MenuItem>
                    ),
                )}
        </Select>
    </StyledFormControl>
)
