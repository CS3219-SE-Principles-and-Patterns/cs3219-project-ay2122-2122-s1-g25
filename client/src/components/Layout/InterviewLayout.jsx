import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Box } from '@material-ui/core'
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
  const { children, currPage, isInterviewee, handleRotation } = props

  const Role = () => {
    if (currPage == 'interview') {
      return (
        <InterviewNavbar
          isInterviewee={isInterviewee}
          handleRotation={handleRotation}
        />
      )
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
        <Role />
      </Box>
      <Box className={classes.contentWrapper}>{children}</Box>
    </Container>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
  currPage: PropTypes.string.isRequired,
  isInterviewee: PropTypes.bool,
  handleRotation: PropTypes.func,
}

export default HomeLayout
