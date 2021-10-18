import React, { useEffect, useState } from 'react'
import AuthWrapper from '../../components/Authentication/AuthWrapper'
import InterviewLayout from '../../components/Layout/InterviewLayout'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { useRouter } from 'next/router'
import { getInterview } from '../../api/interview'
import toast, { Toaster } from 'react-hot-toast'
import { fetchStorage } from '../../storage'
import { ERROR } from '../../utils/message'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackWrapper: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 800,
    padding: '32px 64px 32px 64px',
    backgroundColor: theme.palette.background.secondary,
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
  },
  textBox: {
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: theme.palette.background.main,
    borderRadius: theme.shape.borderRadius,
  },
  rating: {
    margin: 'auto',
  },
  submitBtn: {
    margin: '24px auto 8px auto',
    width: '40%',
  },
  link: {
    cursor: 'pointer',
  },
}))

const Feedback = () => {
  const classes = useStyles()
  const router = useRouter()
  const { iSession } = router.query

  const [loading, setLoading] = useState(true)
  const [interviewData, setInterviewData] = useState()
  const user = fetchStorage('user')

  useEffect(() => {
    if (iSession) {
      fetchInterviewData(iSession)
    }
  }, [iSession])

  useEffect(() => {
    if (user && interviewData) {
      setLoading(false)
    }
  }, [interviewData, user])

  const fetchInterviewData = (iSessionId) => {
    getInterview(iSessionId)
      .then((res) => {
        setInterviewData(res.data)
      })
      .catch(() => toast.error(ERROR.interviewInitialisationFailure))
  }

  const getReceiverId = () => {
    const userId = user.userid
    const user0 = interviewData.interviewSession.user0
    const user1 = interviewData.interviewSession.user1
    if (userId === user0) {
      return user1
    } else if (userId === user1) {
      return user0
    } else {
      toast.error(ERROR.interviewInitialisationFailure)
    }
  }

  const handleRedirectHome = (e) => {
    e.preventDefault()
    // router.push('/home')
    console.log(getReceiverId())
  }

  return (
    <AuthWrapper>
      <Toaster position="top-right" />
      {!loading && (
        <InterviewLayout currPage="feedback">
          <Container className={classes.root} maxWidth="lg">
            <Box className={classes.feedbackWrapper}>
              <Typography variant="h6" gutterBottom>
                Interview Completed!
              </Typography>
              <Typography variant="body2" gutterBottom align="left">
                It would be amazing if you could leave some feedback for your
                fellow peer, so that he / she can further improve.
              </Typography>
              <TextField
                multiline
                rows={4}
                placeholder="Comments on strengths, areas of improvement, etc."
                variant="outlined"
                className={classes.textBox}
              />
              <Typography variant="body2" gutterBottom>
                Overall Rating
              </Typography>
              <Rating className={classes.rating} size="large" />
              <Button
                color="primary"
                variant="contained"
                className={classes.submitBtn}
                onClick={handleRedirectHome}
              >
                Submit
              </Button>
              <Typography
                color="primary"
                variant="body2"
                className={classes.link}
                onClick={handleRedirectHome}
              >
                Skip
              </Typography>
            </Box>
          </Container>
        </InterviewLayout>
      )}
    </AuthWrapper>
  )
}

export default Feedback
