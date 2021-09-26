import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    backgroundSize: 'cover',
    backgroundImage: `url('/Upskill-Background.png')`,
  },
}))

const Index = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <InfoIcon />
      <Typography>Hello</Typography>
    </Box>
  )
}

export default Index
