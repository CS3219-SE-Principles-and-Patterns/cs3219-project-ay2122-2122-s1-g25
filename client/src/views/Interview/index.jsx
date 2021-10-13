import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Box } from '@material-ui/core'
import AuthWrapper from '../../components/Authentication/AuthWrapper'
import InterviewLayout from '../../components/Layout/InterviewLayout'
import AlgorithmQuestion from '../../components/Interview/AlgorithmQuestion'
import Conferencing from '../../components/Interview/Conferencing'
import { io } from 'socket.io-client'
// import CodeEditor from '../../components/Interview/CodeEditor'
import dynamic from 'next/dynamic'
import ChatBox from '../../components/Interview/ChatBox'

const CodeEditor = dynamic(import('../../components/Interview/CodeEditor'), {
  ssr: false,
})
import { ContextProvider } from '../../components/Interview/SocketContext'

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
  //join room
  const chatSocket = io.connect('http://localhost:4000/sockets/chat')
  // chatSocket.emit('joinRoom', 'dsad8u891')
  // chatSocket.on('success', (res) => {
  //   console.log(res)
  // })
  return (
    <AuthWrapper>
      <ContextProvider>
        <InterviewLayout currPage="interview">
          <Container className={classes.root} disableGutters maxWidth="xl">
            <Grid container className={classes.gridWrapper}>
              <Grid item xs={9} className={classes.gridLeft}>
                <Box className={classes.codeWrapper}>
                  <CodeEditor />
                </Box>
                <Box
                  className={classes.questionWrapper}
                  border={1}
                  borderColor="black"
                >
                  <AlgorithmQuestion />
                </Box>
              </Grid>
              <Grid item xs={3} className={classes.gridRight}>
                <Box className={classes.videoWrapper}>
                  <Conferencing />
                </Box>
                <Box className={classes.chatWrapper}>
                  <ChatBox chatSocket={chatSocket} />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </InterviewLayout>
      </ContextProvider>
    </AuthWrapper>
  )
}

export default Interview
