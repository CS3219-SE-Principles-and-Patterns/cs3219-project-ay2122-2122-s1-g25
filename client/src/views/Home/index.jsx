import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Divider,
  Button,
  Typography,
  Container,
  Grid,
  Modal,
  List,
  Box,
  CircularProgress,
} from '@material-ui/core'
import axios from 'axios'
import SessionHistory from '../../components/History/SessionHistory'
import HomeLayout from '../../components/Layout/HomeLayout'
// import { useRouter } from 'next/router'
import AuthWrapper from '../../components/Authentication/AuthWrapper'
import toast, { Toaster } from 'react-hot-toast'
import { ERROR } from '../../utils/message'
import { fetchStorage } from '../../storage'
import HistoryModal from '../HistoryModal'

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
  historyModalContainer: {
    backgroundColor: 'pink',
  },
  waitingModalBody: {
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContentWrapper: {
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    padding: '20px',
  },
  loadingModalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingGreeting: {
    padding: '20px',
  },
  cancelMatching: {
    margin: '10px 20px 20px 20px',
  },
  spinner: {
    margin: '10px',
  },
}))

const Home = () => {
  const classes = useStyles()
  const [buttonClicked, setButtonClicked] = useState(0)
  const loops = Array.from(Array(50).keys())
  // const router = useRouter()
  const user = fetchStorage('user')

  // History
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  const [modalID, setModalID] = useState(-1)
  const handleHistoryModalOpen = (id) => {
    setModalID(id)
    setHistoryModalOpen(true)
  }

  const handleHistoryModalClose = () => {
    setModalID(-1)
    setHistoryModalOpen(false)
  }

  const onDifficultySelection = (buttonNo, event) => {
    // console.log(event.currentTarget.id)
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

  // Loading
  const [openLoading, setOpenLoading] = useState(false)
  const [matchSuccess, setMatchSuccess] = useState(false) // whether we found a match or not
  const [showRetry, setShowRetry] = useState(false) // whether to show retry screen or not
  const [matchingCancelled, setMatchingCancelled] = useState(false) // check if it's timeout or cancelled

  const handleLoadingOpen = () => {
    setOpenLoading(true)
  }

  const handleLoadingClose = () => {
    setOpenLoading(false)

    // Reset all our states
    setMatchSuccess(false)
    setShowRetry(false)
  }

  const findAPartner = () => {
    if (buttonClicked != 0) {
      const currDifficulty = buttonClicked
      document
        .getElementById(buttonClicked)
        .classList.remove(classes.activeButton)
      setButtonClicked(0)

      // Calling API
      handleLoadingOpen()
      axios
        .post('http://localhost:4000/api/matching/', {
          userId: user.userid,
          difficulty: currDifficulty,
        })
        .then((response) => {
          console.log(response)
          // match success, generate interview
          setMatchSuccess(true)
        })
        .catch((error) => {
          console.log(error)
          // unable to match, try again?
          if (!matchingCancelled) {
            setShowRetry(true)
          }
          // reset
          setMatchingCancelled(false)
        })
      // router.push('/interview')
    } else {
      toast.error(ERROR.missingDifficulty)
    }
  }

  const cancelMatching = () => {
    // call API to remove
    axios
      .delete(`http://localhost:4000/api/matching/${user.userid}`)
      .then((response) => {
        // Close Modal
        console.log(response)
        setMatchingCancelled(true)
        handleLoadingClose()
        // success toast?
      })
      .catch((error) => {
        console.log(error)
        // handle error with toast?
      })
  }

  const retryMatching = () => {
    setShowRetry(false)
    findAPartner()
  }

  const retryCancelMatching = () => {
    setShowRetry(false)
    cancelMatching()
  }

  const loadingContent = (
    <Box className={classes.loadingContentWrapper}>
      {/* Not found Match */}
      {!matchSuccess && !showRetry && (
        <Box className={classes.loadingModalWrapper}>
          <Typography variant="subtitle1" className={classes.loadingGreeting}>
            Finding a Partner...
          </Typography>
          <CircularProgress className={classes.spinner} />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.cancelMatching}
            onClick={() => cancelMatching()}
          >
            Cancel Matching
          </Button>
        </Box>
      )}
      {/* Found Match */}
      {matchSuccess && !showRetry && (
        <Box className={classes.loadingModalWrapper}>
          <Typography variant="subtitle1" className={classes.loadingGreeting}>
            Found a Partner!
          </Typography>
          <CircularProgress className={classes.spinner} />
          <Typography variant="subtitle2" className={classes.loadingGreeting}>
            Creating Interview Session...
          </Typography>
        </Box>
      )}
      {/* Retry */}
      {showRetry && (
        <Box className={classes.loadingModalWrapper}>
          <Typography variant="subtitle1" className={classes.loadingGreeting}>
            Matching failed. Retry?
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.cancelMatching}
              onClick={() => retryMatching()}
            >
              Retry Matching
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className={classes.cancelMatching}
              onClick={() => retryCancelMatching()}
            >
              Cancel Matching
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )

  // Actual Home Page
  return (
    <AuthWrapper>
      <HomeLayout currPage="Home Page">
        <Toaster position="top-right" />
        <Container className={classes.root} maxWidth="xl">
          <Grid container className={classes.gridWrapper}>
            <Grid item xs={6} className={classes.leftGridWrapper}>
              <Typography variant="h6">{`Welcome, ${user?.firstname}!`}</Typography>
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
                    <SessionHistory
                      key={i}
                      customClickEvent={handleHistoryModalOpen}
                      id={'history' + i}
                    />
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
                <Divider className={classes.homeDivider} />
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
              </Grid>
            </Grid>
          </Grid>
        </Container>
        {/* History Modal */}
        <Modal
          open={historyModalOpen}
          onClose={handleHistoryModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <HistoryModal closeModal={handleHistoryModalClose} id={modalID} />
        </Modal>
        {/* Loading Modal */}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.loadingModal}
          open={openLoading}
          onClose={handleLoadingClose}
          disableBackdropClick
          disableEscapeKeyDown
        >
          {loadingContent}
        </Modal>
      </HomeLayout>
    </AuthWrapper>
  )
}

export default Home
