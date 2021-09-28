import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Navbar from '../Navbar/HomeNavbar'

const useStyles = makeStyles(() => ({
  homepageWrapper: {
    height: '100vh',
    width: '100%',
    minHeight: '100vh',
    maxHeight: '100vh',
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
    <div className={classes.homepageWrapper}>
      <div className={classes.navbarWrapper}>
        {/* currPage is either 'Home Page' or 'Profile'*/}
        <Navbar currPage={props.currPage} />
      </div>
      <div className={classes.contentWrapper}>{children}</div>
    </div>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
  currPage: PropTypes.string.isRequired,
}

export default HomeLayout
