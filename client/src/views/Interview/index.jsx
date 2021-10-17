import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Box } from '@material-ui/core'
import AuthWrapper from '../../components/Authentication/AuthWrapper'
import InterviewLayout from '../../components/Layout/InterviewLayout'
import AlgorithmQuestion from '../../components/Interview/AlgorithmQuestion'
import Conferencing from '../../components/Interview/Conferencing'
import toast, { Toaster } from 'react-hot-toast'

// import CodeEditor from '../../components/Interview/CodeEditor'
import ChatBox from '../../components/Interview/ChatBox'
import dynamic from 'next/dynamic'
const CodeEditor = dynamic(import('../../components/Interview/CodeEditor'), {
  ssr: false,
})
import { ContextProvider } from '../../components/Interview/SocketContext'
import { getInterview, updateInterview } from '../../api/interview'
import { fetchStorage } from '../../storage'
import { ERROR } from '../../utils/message'
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

  const [iSessionId, setISessionId] = useState()
  const [userNum, setUserNum] = useState()
  const [rotationNum, setRotationNum] = useState()

  console.log(rotationNum)
  useEffect(() => {
    const pathname = window.location.pathname
    const iSessionId = pathname.substring(pathname.lastIndexOf('/') + 1)
    setISessionId(iSessionId)
    getInterview(iSessionId)
      .then((res) => {
        setInterviewData(res.data)
      })
      .catch(() => toast.error(ERROR.interviewInitialisationFailure))
  }, [])

  useEffect(() => {
    rotationSocket.on('receive-rotation-message', (data) => {
      console.log('New rotation: ', data)
      setRotationNum(data)
    })
  }, [rotationSocket])

  useEffect(() => {
    if (user && interviewData && iSessionId) {
      setUserNum(getUserNum(interviewData, user.userid))
      setRotationNum(interviewData.interviewSession.rotationnum)
      console.log('ONCE', user, interviewData, iSessionId)
      rotationSocket.emit('joinRoom', {
        room: iSessionId,
        user: user.firstname,
      })
      setLoading(false)
    }
  }, [interviewData, user, iSessionId])

  const handleRotation = () => {
    let newRotation = -1
    if (rotationNum == 0) {
      newRotation = 1
    } else {
      newRotation = 0
    }

    updateInterview(iSessionId, { rotationNum: newRotation })
      .then(() => {
        toast.success('Rotated!')
        getInterview(iSessionId)
          .then((res) => {
            setInterviewData(res.data)
          })
          .catch(() => toast.error(ERROR.interviewInitialisationFailure))
      })
      .catch(() => toast.error('Rotation failed'))
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
