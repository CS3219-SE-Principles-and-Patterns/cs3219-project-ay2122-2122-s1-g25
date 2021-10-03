import React from 'react'
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

  const handleRedirectHome = (e) => {
    e.preventDefault()
    router.push('/home')
  }

  return (
    <AuthWrapper>
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
    </AuthWrapper>
  )
}

export default Feedback
