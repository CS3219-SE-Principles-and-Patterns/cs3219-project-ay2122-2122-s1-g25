import React, { useEffect, useState } from 'react'
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
  ChatBox.propTypes = {
    chatSocket: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  const classes = useStyles()
  const { chatSocket, user } = props
  const uid = user.userid

  const [chat, setChat] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    chatSocket.on('receive-chat-message', (newMessage) => {
      setChat((chat) => [newMessage, ...chat])
    })
  }, [chatSocket])

  const handleChangeInput = (e) => {
    setInput(e.target.value)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (input.trim()) {
      const newMessage = {
        uid: uid,
        message: input,
        timestamp: new Date().getTime().toString(),
      }
      chatSocket.emit('send-chat-message', newMessage)
      setInput('')
    }
  }

  const renderChat = chat.map((message) => (
    <Typography
      key={message.timestamp}
      className={
        message.uid === uid ? classes.userMessage : classes.otherMessage
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
