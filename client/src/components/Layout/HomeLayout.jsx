import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Navbar from '../Navbar/HomeNavbar'
import { Container, Box } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  homepageWrapper: {
    height: '100vh',
    width: '100%',
  },
  navbarWrapper: {
    height: '15%',
    width: '100%',
    minHeight: '100px',
  },
  contentWrapper: {
    height: '85%',
    width: '100%',
  },
}))

const HomeLayout = (props) => {
  const classes = useStyles()
  const { children } = props

  return (
    <Container className={classes.homepageWrapper} disableGutters maxWidth="xl">
      <Box className={classes.navbarWrapper}>
        {/* currPage is either 'Home Page' or 'Profile'*/}
        <Navbar currPage={props.currPage} />
      </Box>
      <Box className={classes.contentWrapper}>{children}</Box>
    </Container>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
  currPage: PropTypes.string.isRequired,
}

export default HomeLayout
