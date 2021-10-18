import React, { useContext } from 'react'
import { Button, Container, Grid, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

import { SocketContext } from '../Interview/SocketContext'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
  },
  upskillLogo: {
    height: '35px',
    width: 'auto',
  },
  gridWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },
  switchRoleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  rotateButton: {
    marginLeft: '10px',
  },
  roleDisplay: {
    color: 'white',
    fontWeight: 700,
  },
}))

const FeedbackNavbar = () => {
  const classes = useStyles()
  const router = useRouter()

  const exitFeedback = () => {
    router.push('/home')
  }

  return (
    <Container className={classes.root} maxWidth="xl">
      <Grid container className={classes.gridWrapper}>
        <img src={'/Upskill-Logo-White.png'} className={classes.upskillLogo} />
        <Box className={classes.buttonWrapper}>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            type="submit"
            onClick={() => exitFeedback()}
          >
            Exit
          </Button>
        </Box>
      </Grid>
    </Container>
  )
}

const InterviewNavbar = (props) => {
  const classes = useStyles()
  const router = useRouter()
  const { rotationNum, userNum, handleRotation } = props

  InterviewNavbar.propTypes = {
    currPage: PropTypes.string,
    rotationNum: PropTypes.number,
    userNum: PropTypes.number,
    handleRotation: PropTypes.func,
  }

  const getRole = (rotationNum, userNum) => {
    if (rotationNum === 0) {
      if (userNum === 0) {
        return 'Interviewee'
      } else if (userNum === 1) {
        return 'Interviewer'
      }
    } else if (rotationNum === 1) {
      if (userNum === 0) {
        return 'Interviewer'
      } else if (userNum === 1) {
        return 'Interviewee'
      }
    }
  }

  const onRotate = () => {
    handleRotation()
  }

  const { leaveCall } = useContext(SocketContext)

  const exitInterview = () => {
    leaveCall() // close camera & stuff
    const pathname = window.location.pathname
    const iSessionId = pathname.substring(pathname.lastIndexOf('/') + 1)
    router.push(`/feedback?iSession=${iSessionId}`)
  }

  function Role() {
    return (
      <Box className={classes.switchRoleContainer}>
        <Typography variant="body2" className={classes.roleDisplay}>
          Role: {getRole(rotationNum, userNum)}
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          type="submit"
          className={classes.rotateButton}
          onClick={() => onRotate()}
        >
          Rotate
        </Button>
      </Box>
    )
  }

  return (
    <Container className={classes.root} maxWidth="xl">
      <Grid container className={classes.gridWrapper}>
        <img src={'/Upskill-Logo-White.png'} className={classes.upskillLogo} />
        <Role currPage={props.currPage} />
        <Box className={classes.buttonWrapper}>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            type="submit"
            onClick={() => exitInterview()}
          >
            Exit
          </Button>
        </Box>
      </Grid>
    </Container>
  )
}

// export default navbar
export { InterviewNavbar, FeedbackNavbar }
