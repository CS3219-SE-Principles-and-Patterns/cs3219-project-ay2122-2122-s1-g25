import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Box } from '@material-ui/core'
// import InterviewNavbar from '../Navbar/InterviewNavbar'
import { FeedbackNavbar, InterviewNavbar } from '../Navbar/InterviewNavbar'

const useStyles = makeStyles(() => ({
  interviewPageWrapper: {
    height: '100vh',
    width: '100%',
  },
  navbarWrapper: {
    height: '5%',
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

  const Role = (props) => {
    if (props.currPage == 'interview') {
      return <InterviewNavbar />
    } else {
      return <FeedbackNavbar />
    }
  }

  return (
    <Container
      className={classes.interviewPageWrapper}
      disableGutters
      maxWidth="xl"
    >
      <Box className={classes.navbarWrapper}>
        {/* currPage is either 'interview' or 'feedback'*/}
        <Role currPage={props.currPage} />
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
