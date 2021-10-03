import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Divider,
  Button,
  Typography,
  Container,
  Grid,
  List,
  Snackbar,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import SessionHistory from '../../components/History/SessionHistory'
import HomeLayout from '../../components/Layout/HomeLayout'
import { useRouter } from 'next/router'
import AuthWrapper from '../../components/Authentication/AuthWrapper'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  gridWrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftGridWrapper: {
    height: '100%',
    padding: '10px',
  },
  rightGridWrapper: {
    height: '100%',
    padding: '10px',
  },
  sectionHeader: {
    fontWeight: 700,
  },
  sessionHistoryWrapper: {
    height: '90%',
    backgroundColor: theme.palette.background.secondary,
    borderRadius: theme.shape.borderRadius,
    padding: 16,
    overflow: 'auto',
  },
  homeDivider: {
    background: '#ffffff',
  },
  mockInterviewWrapper: {
    height: '100%',
    backgroundColor: theme.palette.background.secondary,
    borderRadius: theme.shape.borderRadius,
    padding: 16,
    '& Button': {
      width: '100%',
      minHeight: '100px',
      marginTop: '20px',
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
  interviewGreetings: {
    paddingTop: '10px',
  },
  buttonWrapper: {
    height: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  easyButton: {
    width: '100%',
  },
  moderateButton: {
    width: '100%',
    backgroundColor: theme.palette.tertiary.main,
  },
  hardButton: {
    width: '100%',
    backgroundColor: '#FF8964',
  },
  matchButton: {
    width: '100%',
  },
  activeButton: {
    backgroundColor: 'grey',
  },
}))

const Home = () => {
  const classes = useStyles()
  const [buttonClicked, setButtonClicked] = useState(0)
  const loops = Array.from(Array(50).keys())
  const router = useRouter()

  const onDifficultySelection = (buttonNo, event) => {
    console.log(event.currentTarget.id)
    if (buttonClicked == 0) {
      setButtonClicked(buttonNo)
      document
        .getElementById(event.currentTarget.id)
        .classList.add(classes.activeButton)
    } else {
      if (buttonNo == buttonClicked) {
        setButtonClicked(0)
        document
          .getElementById(event.currentTarget.id)
          .classList.remove(classes.activeButton)
      } else {
        document
          .getElementById(buttonClicked + '')
          .classList.remove(classes.activeButton)
        document
          .getElementById(event.currentTarget.id)
          .classList.add(classes.activeButton)
        setButtonClicked(buttonNo)
      }
    }
  }

  // snackbar
  const [open, setOpen] = React.useState(false)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const findAPartner = () => {
    if (buttonClicked != 0) {
      document
        .getElementById(buttonClicked)
        .classList.remove(classes.activeButton)
      setButtonClicked(0)
      // send matching data to db
      // modal screen to load 30s
      // matching success
      router.push('/interview')
    } else {
      // toast msg
      setOpen(true)
    }
  }

  return (
    <AuthWrapper>
      <HomeLayout currPage="Home Page">
        <Container className={classes.root} maxWidth="xl">
          <Grid container className={classes.gridWrapper}>
            <Grid item xs={6} className={classes.leftGridWrapper}>
              <Typography variant="h6">Welcome, Bobby!</Typography>
              <Grid item className={classes.sessionHistoryWrapper}>
                <Typography
                  variant="subtitle2"
                  className={classes.sectionHeader}
                >
                  Session History
                </Typography>
                <Divider className={classes.homeDivider} />
                <List>
                  {loops.map((i) => (
                    <SessionHistory key={i} />
                  ))}
                </List>
              </Grid>
            </Grid>
            <Grid item xs={6} className={classes.rightGridWrapper}>
              <Grid item className={classes.mockInterviewWrapper}>
                <Typography
                  variant="subtitle2"
                  className={classes.sectionHeader}
                >
                  Mock Interview Session
                </Typography>
                <Divider className={classes.homeDivider} />{' '}
                <Typography
                  variant="body2"
                  className={classes.interviewGreetings}
                >
                  {" Let's get started by selecting your desired difficulty!"}
                </Typography>
                <Grid item className={classes.buttonWrapper}>
                  <Button
                    id="1"
                    variant="contained"
                    color="secondary"
                    type="submit"
                    className={classes.easyButton}
                    onClick={(e) => onDifficultySelection(1, e)}
                  >
                    Easy
                  </Button>
                  <Button
                    id="2"
                    variant="contained"
                    type="submit"
                    className={classes.moderateButton}
                    onClick={(e) => onDifficultySelection(2, e)}
                  >
                    Moderate
                  </Button>
                  <Button
                    id="3"
                    variant="contained"
                    type="submit"
                    className={classes.hardButton}
                    onClick={(e) => onDifficultySelection(3, e)}
                  >
                    Hard
                  </Button>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.matchButton}
                  onClick={() => findAPartner()}
                >
                  Find a Partner!
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={3000}
                  onClose={handleClose}
                >
                  <Alert severity="error">
                    Select a difficulty before finding a Partner!
                  </Alert>
                </Snackbar>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </HomeLayout>
    </AuthWrapper>
  )
}

export default Home
