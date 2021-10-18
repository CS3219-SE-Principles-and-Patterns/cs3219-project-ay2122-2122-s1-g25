import React, { createContext, useState, useRef, useEffect } from 'react'
// import { io } from 'socket.io-client'
import Peer from 'simple-peer'
import PropTypes from 'prop-types'

// import { Box } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles(() => ({}))

const SocketContext = createContext()
// const socket = io('https://localhost:5000') // pass url of deployed server - dummy now

// const ContextProvider = ({ children }) => {
const ContextProvider = ({ children }) => {
  ContextProvider.propTypes = {
    children: PropTypes.any,
  }

  const [stream, setStream] = useState(null)
  const [me, setMe] = useState('')
  const [call, setCall] = useState({})
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState('')

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  useEffect(() => {
    // permission for audio & camera
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        // set our stream once we get it
        setStream(currentStream)

        // set currStream to a ref -> populate video iframe
        myVideo.current.srcObject = currentStream
      })

    // socket.on('me', (id) => setMe(id)) // get id
    // socket.on('calluser', ({ from, name: callerName, signal }) => {
    //   setCall({ isReceivedCall: true, from, name: callerName, signal })
    // })

    // dummy until connected w be
    setMe('')
    setCall({})
  }, [])

  const answerCall = () => {
    setCallAccepted(true)

    const peer = new Peer({ initiator: false, trickle: false, stream })

    // peer.on('signal', (data) => {
    //   socket.emit('answercall', { signal: data, to: call.from })
    // })

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    peer.signal(call.signal)
    connectionRef.current = peer
  }

  //   const callUser = (id) => {
  const callUser = () => {
    const peer = new Peer({ initiator: true, trickle: false, stream })

    // peer.on('signal', (data) => {
    //   socket.emit('calluser', {
    //     userToCall: id,
    //     signalData: data,
    //     from: me,
    //     name,
    //   })
    // })

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    // socket.on('callaccepted', (signal) => {
    //   setCallAccepted(true)
    //   peer.signal(signal)
    // })

    connectionRef.current = peer
  }

  const leaveCall = () => {
    console.log('Leaving call')
    setCallEnded(true)
    // connectionRef.current.destroy() // stop receiving input from camera & audio

    // close camera
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export { ContextProvider, SocketContext }
