import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Box } from '@material-ui/core'
import AuthWrapper from '../../components/Authentication/AuthWrapper'
import InterviewLayout from '../../components/Layout/InterviewLayout'
import AlgorithmQuestion from '../../components/Interview/AlgorithmQuestion'
import Conferencing from '../../components/Interview/Conferencing'
import toast, { Toaster } from 'react-hot-toast'
import ChatBox from '../../components/Interview/ChatBox'
import dynamic from 'next/dynamic'
const CodeEditor = dynamic(import('../../components/Interview/CodeEditor'), {
  ssr: false,
})
import { ContextProvider } from '../../components/Interview/SocketContext'
import { getInterview, updateInterview } from '../../api/interview'
import { fetchStorage } from '../../storage'
import { ERROR, SUCCESS } from '../../utils/message'
import { rotationSocket } from '../../config/socket'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  gridWrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridLeft: {
    height: '100%',
  },
  gridRight: {
    height: '100%',
  },
  codeWrapper: {
    height: '70%',
  },
  questionWrapper: {
    height: '30%',
  },
  videoWrapper: {
    height: '25%',
  },
  chatWrapper: {
    height: '75%',
  },
}))

const Interview = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)

  const [interviewData, setInterviewData] = useState()
  const user = fetchStorage('user')

  const [userNum, setUserNum] = useState()
  const [rotationNum, setRotationNum] = useState()

  useEffect(() => {
    fetchInterviewData(getInterviewSessionId())
  }, [])

  useEffect(() => {
    if (user && interviewData) {
      setUserNum(getUserNum(interviewData, user.userid))
      setRotationNum(interviewData.interviewSession.rotationnum)
      rotationSocket.emit('joinRoom', {
        room: getInterviewSessionId(),
        user: user.firstname,
      })
      setLoading(false)
    }
  }, [interviewData, user])

  useEffect(() => {
    rotationSocket.on('receive-rotation-message', () => {
      toast.success(SUCCESS.rotation)
      fetchInterviewData(getInterviewSessionId())
    })
  }, [rotationSocket])

  const handleRotation = () => {
    let newRotation = -1
    if (rotationNum === 0) {
      newRotation = 1
    } else {
      newRotation = 0
    }

    updateInterview(getInterviewSessionId(), { rotationNum: newRotation })
      .then(() => {
        rotationSocket.emit('send-rotation-message', newRotation)
      })
      .catch(() => toast.error(ERROR.rotationFailure))
  }

  const fetchInterviewData = (iSessionId) => {
    getInterview(iSessionId)
      .then((res) => {
        setInterviewData(res.data)
      })
      .catch(() => toast.error(ERROR.interviewInitialisationFailure))
  }

  const getInterviewSessionId = () => {
    const pathname = window.location.pathname
    const iSessionId = pathname.substring(pathname.lastIndexOf('/') + 1)
    return iSessionId
  }

  const getUserNum = (interviewData, userId) => {
    const user0 = interviewData?.interviewSession?.user0
    const user1 = interviewData?.interviewSession?.user1
    if (userId === user0) {
      return 0
    } else if (userId === user1) {
      return 1
    } else {
      toast.error(ERROR.interviewInitialisationFailure)
    }
  }

  return (
    <AuthWrapper>
      <Toaster position="top-right" />
      <ContextProvider>
        {!loading && (
          <InterviewLayout
            currPage="interview"
            rotationNum={rotationNum}
            userNum={userNum}
            handleRotation={handleRotation}
          >
            <Container className={classes.root} disableGutters maxWidth="xl">
              <Grid container className={classes.gridWrapper}>
                <Grid item xs={9} className={classes.gridLeft}>
                  <Box className={classes.codeWrapper}>
                    <CodeEditor initialCode={''} editable={true} />
                  </Box>
                  <Box
                    className={classes.questionWrapper}
                    border={1}
                    borderColor="black"
                  >
                    <AlgorithmQuestion
                      question={interviewData?.rotations[rotationNum]}
                    />
                  </Box>
                </Grid>
                <Grid item xs={3} className={classes.gridRight}>
                  <Box className={classes.videoWrapper}>
                    <Conferencing />
                  </Box>
                  <Box className={classes.chatWrapper}>
                    <ChatBox />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </InterviewLayout>
        )}
      </ContextProvider>
    </AuthWrapper>
  )
}

export default Interview
