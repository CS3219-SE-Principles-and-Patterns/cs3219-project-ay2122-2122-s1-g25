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
import {
  getInterview,
  updateInterviewRotation,
  getPartnerDetails,
} from '../../api/interview'
import { fetchStorage } from '../../storage'
import { ERROR, SUCCESS } from '../../utils/message'
import { chatSocket, rotationSocket, videoSocket } from '../../config/socket'
import { useRouter } from 'next/router'

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

export const isInvalidInterviewSession = (interviewData) => {
  return interviewData?.interviewSession === undefined
}

export const isInterviewCompleted = (interviewData) => {
  return interviewData.interviewSession.complete
}

export const isInvalidInterviewUser = (interviewData, user) => {
  const user0 = interviewData.interviewSession.user0
  const user1 = interviewData.interviewSession.user1
  const currUser = user.userid
  return currUser != user0 && currUser != user1
}

const Interview = () => {
  const classes = useStyles()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const [interviewData, setInterviewData] = useState()
  const user = fetchStorage('user')

  const [userNum, setUserNum] = useState()
  const [partnerId, setPartnerId] = useState()
  const [partnerName, setPartnerName] = useState('')
  const [rotationNum, setRotationNum] = useState()

  useEffect(() => {
    fetchInterviewData(getInterviewSessionId())
  }, [])

  useEffect(() => {
    if (interviewData) {
      if (isInvalidInterviewSession(interviewData)) {
        toast.error(ERROR.interviewInvalidAlert)
        router.push('/home')
      } else if (isInterviewCompleted(interviewData)) {
        toast.error(ERROR.interviewClosedAlert)
        router.push('/home')
      } else if (isInvalidInterviewUser(interviewData, user)) {
        toast.error(ERROR.invalidInterviewUserAlert)
        router.push('/home')
      } else {
        setUserNum(getUserNum(interviewData, user.userid))
        setRotationNum(interviewData.interviewSession.rotationnum)
        rotationSocket.emit('joinRoom', {
          room: getInterviewSessionId(),
          user: user.firstname,
        })
        chatSocket.emit('joinRoom', {
          room: getInterviewSessionId(),
          user: user.firstname,
        })
        setLoading(false)
      }
    }
  }, [interviewData])

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
      // TODO: Future enhancement, to allow unlimited rotations.
      toast.error(ERROR.rotationCompleted)
      return
    }

    updateInterviewRotation(getInterviewSessionId(), {
      rotationNum: newRotation,
    })
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
      setPartnerId(user1)
      getPartnerDetails(user1)
        .then((res) => {
          setPartnerName(res.data[0].firstname + ' ' + res.data[0].lastname)
        })
        .catch(() => toast.error(ERROR.userDataRetrivalFailure))
      return 0
    } else if (userId === user1) {
      setPartnerId(user0)
      getPartnerDetails(user0)
        .then((res) => {
          setPartnerName(res.data[0].firstname + ' ' + res.data[0].lastname)
        })
        .catch(() => toast.error(ERROR.userDataRetrivalFailure))
      return 1
    }
  }

  const [videoStream, setVideoStream] = useState()
  const [myPeer, setMyPeer] = useState()

  return (
    <AuthWrapper>
      <Toaster position="top-right" />
      {!loading && (
        <InterviewLayout
          currPage="interview"
          isInterviewee={userNum === rotationNum}
          handleRotation={handleRotation}
          videoStream={videoStream}
          myPeer={myPeer}
        >
          <Container className={classes.root} disableGutters maxWidth="xl">
            <Grid container className={classes.gridWrapper}>
              <Grid item xs={9} className={classes.gridLeft}>
                <Box className={classes.codeWrapper}>
                  <CodeEditor
                    initialCode={interviewData.rotations[rotationNum].attempt}
                    editable={true}
                    iSessionId={getInterviewSessionId()}
                    rotationNum={rotationNum}
                    user={user.firstname}
                  />
                </Box>
                <Box
                  className={classes.questionWrapper}
                  border={1}
                  borderColor="black"
                >
                  <AlgorithmQuestion
                    question={interviewData?.rotations[rotationNum]}
                    isInterviewee={userNum === rotationNum}
                  />
                </Box>
              </Grid>
              <Grid item xs={3} className={classes.gridRight}>
                <Box className={classes.videoWrapper}>
                  <Conferencing
                    interviewSessionId={getInterviewSessionId()}
                    isInterviewee={userNum === rotationNum}
                    partnerId={partnerId}
                    partnerName={partnerName}
                    videoSocket={videoSocket}
                    user={user}
                    passStreamData={setVideoStream}
                    passMyPeer={setMyPeer}
                  />
                </Box>
                <Box className={classes.chatWrapper}>
                  <ChatBox chatSocket={chatSocket} user={user} />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </InterviewLayout>
      )}
    </AuthWrapper>
  )
}

export default Interview
