import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store'
import _get from 'lodash/get'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    card: {
        width: '100%',
        backgroundColor: '#e1f5fe',
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        backgroundColor: 'white',
    },
    outerBox: {
        display: 'flex',
        '&:not(:last-child)': {
            marginRight: '10px',
        },
    },
}))

const ElemView = ({ name }) => {
    const classes = useStyles()
    const { pokemonStore } = useStore()
    const data = _get(pokemonStore, `itemsDetails.${name}`, {})

    React.useEffect(() => {
        pokemonStore.loadDetailsIfNeeded(name)
    }, [name])

    return (
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Box className={classes.outerBox}>
                        <Avatar
                            className={classes.avatar}
                            alt="Remy Sharp"
                            src={_get(data, 'sprites.front_default', '')}
                        />
                        <Box className={classes.innerBox}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {data.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {data.types && data.types.map(item => item.type.name).join(', ')}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}

export default observer(ElemView)
