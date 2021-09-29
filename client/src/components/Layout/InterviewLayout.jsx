import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import InterviewNavbar from '../Navbar/InterviewNavbar'

const useStyles = makeStyles(() => ({
  interviewPageWrapper: {
    height: '100vh',
    width: '100%',
    minHeight: '100vh',
    maxHeight: '100vh',
  },
  navbarWrapper: {
    height: '50px',
    width: '100%',
  },
  contentWrapper: {
    height: '95%',
    width: '100%',
  },
}))

const HomeLayout = (props) => {
  const classes = useStyles()
  const { children } = props

  return (
    <div className={classes.interviewPageWrapper}>
      <div className={classes.navbarWrapper}>
        {/* currPage is either 'interview' or 'feedback'*/}
        <InterviewNavbar currPage={props.currPage} />
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
