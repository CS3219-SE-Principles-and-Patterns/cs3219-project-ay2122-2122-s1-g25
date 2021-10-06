import React, { useState } from 'react'
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
    overflow: 'scroll',
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

const ChatBox = () => {
  const classes = useStyles()
  const user = 'user1'

  const MOCK_CHAT = [
    {
      uid: 'user2',
      message: 'Sure!',
      timestamp: '2020-10-05 14:06:10-08',
    },
    {
      uid: 'user1',
      message: 'Same here! Shall we get started with the question?',
      timestamp: '2020-10-05 14:05:10-08',
    },
    {
      uid: 'user2',
      message: 'I am doing good, just not really a morning person HAHA',
      timestamp: '2020-10-05 14:04:10-08',
    },
    {
      uid: 'user2',
      message: 'Nice to meet you!',
      timestamp: '2020-10-05 14:03:10-08',
    },
    {
      uid: 'user1',
      message: 'How are you doing?',
      timestamp: '2020-10-05 14:02:10-08',
    },
    {
      uid: 'user1',
      message: 'Hello there!',
      timestamp: '2020-10-05 14:01:10-08',
    },
  ]
  const [chat, setChat] = useState(MOCK_CHAT)
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

export default ChatBox
