import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    backgroundSize: 'cover',
    backgroundImage: `url('/Upskill-Background.png')`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const AuthLayout = (props) => {
  const classes = useStyles()
  const { children } = props

  return <Box className={classes.root}>{children}</Box>
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthLayout
