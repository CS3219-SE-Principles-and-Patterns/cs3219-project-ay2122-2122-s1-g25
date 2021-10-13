import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { fetchStorage } from '../../storage'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    borderTop: '1px solid black',
    padding: 8,
  },
  contentWrapper: {
    height: '90%',
  },
  speechWrapper: {
    maxHeight: '90%',
    padding: 8,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  userMessage: {
    background: theme.palette.background.tertiary,
    maxWidth: '45%',
    marginBottom: 4,
    padding: 8,
    borderRadius: theme.shape.borderRadius,
    alignSelf: 'end',
    wordWrap: 'anywhere',
  },
  otherMessage: {
    background: theme.palette.secondary.main,
    maxWidth: '45%',
    marginBottom: 4,
    padding: 8,
    borderRadius: theme.shape.borderRadius,
    alignSelf: 'start',
    wordWrap: 'anywhere',
  },
  sendWrapper: {
    height: '10%',
  },
  formWrapper: {
    display: 'contents',
  },
  inputWrapper: {
    padding: 4,
    margin: 'auto',
  },
  textBox: {
    '& .MuiOutlinedInput-input': {
      padding: '10px 16px',
      fontSize: 16,
    },
  },
  btnWrapper: {
    margin: 'auto',
    textAlign: 'center',
  },
}))

const ChatBox = (props) => {
  const classes = useStyles()
  const user = fetchStorage('user')
  //join room
  props.chatSocket.emit('joinRoom', { room: 'dsad8u891', user: user })
  props.chatSocket.on('successfully joined room', (res) => {
    console.log(res)
  })
  props.chatSocket.on('user-disconnected', (msg) => {
    alert(msg)
  })
  props.chatSocket.on('new-user', (msg) => {
    console.log(msg)
  })
  // const MOCK_CHAT = [
  //   {
  //     uid: 'user2',
  //     message: 'Sure!',
  //     timestamp: '2020-10-05 14:06:10-08',
  //   },
  //   {
  //     uid: 'user1',
  //     message: 'Same here! Shall we get started with the question?',
  //     timestamp: '2020-10-05 14:05:10-08',
  //   },
  //   {
  //     uid: 'user2',
  //     message: 'I am doing good, just not really a morning person HAHA',
  //     timestamp: '2020-10-05 14:04:10-08',
  //   },
  //   {
  //     uid: 'user2',
  //     message: 'Nice to meet you!',
  //     timestamp: '2020-10-05 14:03:10-08',
  //   },
  //   {
  //     uid: 'user1',
  //     message: 'How are you doing?',
  //     timestamp: '2020-10-05 14:02:10-08',
  //   },
  //   {
  //     uid: 'user1',
  //     message: 'Hello there!',
  //     timestamp: '2020-10-05 14:01:10-08',
  //   },
  // ]
  const [chat, setChat] = useState([])
  const [input, setInput] = useState('')

  const handleChangeInput = (e) => {
    setInput(e.target.value)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    const newMessage = {
      uid: user,
      message: input,
      timestamp: new Date().getTime().toString(),
    }
    setChat([newMessage, ...chat])
    props.chatSocket.emit('send-chat-message', newMessage)
    setInput('')
  }

  const renderChat = chat.map((message) => (
    <Typography
      key={message.timestamp}
      className={
        message.uid === user ? classes.userMessage : classes.otherMessage
      }
    >
      {message.message}
    </Typography>
  ))

  useEffect(() => {
    props.chatSocket.on('chat-message', (newMessage) => {
      setChat([newMessage, ...chat])
    })
  }, [props.chatSocket])

  return (
    <Box className={classes.root}>
      <Box className={classes.contentWrapper}>
        <Typography variant="subtitle1">Chat</Typography>
        <Divider />
        <Box className={classes.speechWrapper}>{renderChat}</Box>
      </Box>
      <Divider />
      <Grid container className={classes.sendWrapper}>
        <form className={classes.formWrapper}>
          <Grid item xs={9} className={classes.inputWrapper}>
            <TextField
              className={classes.textBox}
              variant="outlined"
              placeholder="Chat with your buddy here"
              fullWidth
              value={input}
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item xs={3} className={classes.btnWrapper}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              type="submit"
            >
              Send
            </Button>
          </Grid>
        </form>
      </Grid>
    </Box>
  )
}

ChatBox.propTypes = {
  chatSocket: PropTypes.object,
}

export default ChatBox
