import React, { useEffect, useRef, useState } from 'react'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import { ContextProvider, SocketContext } from './SocketContext'
// import { SocketContext } from './SocketContext'
import PropTypes from 'prop-types'

import { fetchStorage } from '../../storage'
import Peer from 'simple-peer'
import { videoSocket } from '../../config/socket'

const useStyles = makeStyles(() => ({
  videoContainer: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',

    display: 'flex',
  },
  videoWrapper: {
    height: '100%',
    width: '50%',
    padding: '5px',
    // background: 'pink',
  },
  videoBox: {
    height: '100%',
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
  },
  names: {
    color: 'white',
    padding: '10px',
    textAlign: 'center',
  },
}))

const Conferencing = (props) => {
  const classes = useStyles()

  Conferencing.propTypes = {
    interviewSessionId: PropTypes.string,
    isInterviewee: PropTypes.boolean,
  }

  const user = fetchStorage('user')
  // const [peers, setPeers] = useState([])
  const userVideo = useRef()
  const partnerVideo = useRef()
  // const [stream, setStream] = useState()
  // const [partnerName, setPartnerName] = useState('')

  // const peersRef = useRef([])
  // const [callerSignal, setCallerSignal] = useState()
  const [callAccepted, setCallAccepted] = useState(false)

  // const [acceptedOffer, setAcceptedOffer] = useState()

  const [runOnce, setRunOnce] = useState(false)
  // const roomID = props.interviewSessionId

  // useEffect(() => {
  //   // })
  // }, [])

  useEffect(() => {
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((stream) => {

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // setStream(stream)
        if (userVideo.current) {
          userVideo.current.srcObject = stream
        }
        console.log(stream)

        // videoSocket.on('successfully joined room', (message) => {
        //   console.log(message.successMsg)

        //   // send data stream over -- let interviewee initiate call
        //   console.log(user.userid + ' ' + message.joinedId)
        //   if (props.isInterviewee && message.joinedId == user.userid) {
        //     console.log('I am calling, this is me: ' + user.userid)
        //     console.log(stream)
        //     callPeer(stream)
        //   }
        // })

        // if (!props.isInterviewee) {
        //   videoSocket.on('hey', (data) => {
        //     console.log('I am receiving a call from: ' + data.from)
        //     console.log(stream)

        //     setCallerSignal(data.signal)
        //     // console.log(data.signal)
        //     acceptCall(data.from, data.signal)
        //   })
        // }
      })

    // let count = 0
    // count += 1
    // console.log(count)
    // console.log(runOnce)
    // if (!runOnce) {
    setRunOnce(true)
    videoSocket.on('successfully joined room', (message) => {
      console.log(message.successMsg)

      // send data stream over -- let interviewee initiate call
      console.log(user.userid + ' ' + message.joinedId)
      if (props.isInterviewee && message.joinedId == user.userid) {
        console.log('I am calling, this is me: ' + user.userid)
        // console.log(stream)
        callPeer()
      }
    })

    if (!props.isInterviewee) {
      videoSocket.on('hey', (data) => {
        console.log('I am receiving a call from: ' + data.from)
        // console.log(stream)

        // setCallerSignal(data.signal)
        // console.log(data.signal)
        acceptCall(data.from, data.signal)
      })
    }
    // }
    // })
  }, [])

  function callPeer() {
    console.log('Peer is being called')
    console.log(runOnce)
    if (!callAccepted) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          const peer = new Peer({
            initiator: true,
            trickle: false,
            config: {
              iceServers: [
                {
                  urls: 'stun:numb.viagenie.ca',
                  username: 'sultan1640@gmail.com',
                  credential: '98376683',
                },
                {
                  urls: 'turn:numb.viagenie.ca',
                  username: 'sultan1640@gmail.com',
                  credential: '98376683',
                },
              ],
            },
            stream: stream,
          })
          // console.log('This is the stream')
          // console.log(stream)
          peer.on('signal', (data) => {
            console.log('Peer signal this data sent:')
            console.log(data)
            videoSocket.emit('callUser', {
              signalData: data,
              from: user.userid,
            })
          })

          peer.on('stream', (stream) => {
            console.log('Peer Stream')
            if (partnerVideo.current) {
              partnerVideo.current.srcObject = stream
              console.log('The stream for my partner in Call Peer: ')
              console.log(stream)
            }
          })

          videoSocket.on('callAccepted', (signal) => {
            setCallAccepted(true)
            console.log('Call Accepcted:')
            console.log(signal)
            peer.signal(signal)
          })
        })

      // const peer = new Peer({
      //   initiator: true,
      //   trickle: false,
      //   config: {
      //     iceServers: [
      //       {
      //         urls: 'stun:numb.viagenie.ca',
      //         username: 'sultan1640@gmail.com',
      //         credential: '98376683',
      //       },
      //       {
      //         urls: 'turn:numb.viagenie.ca',
      //         username: 'sultan1640@gmail.com',
      //         credential: '98376683',
      //       },
      //     ],
      //   },
      //   stream: stream,
      // })
      // // console.log('This is the stream')
      // // console.log(stream)
      // peer.on('signal', (data) => {
      //   console.log('Peer signal this data sent:')
      //   console.log(data)
      //   videoSocket.emit('callUser', {
      //     signalData: data,
      //     from: user.userid,
      //   })
      // })

      // peer.on('stream', (stream) => {
      //   console.log('Peer Stream')
      //   if (partnerVideo.current) {
      //     partnerVideo.current.srcObject = stream
      //     console.log('The stream for my partner in Call Peer: ')
      //     console.log(stream)
      //   }
      // })

      // videoSocket.on('callAccepted', (signal) => {
      //   setCallAccepted(true)
      //   console.log('Call Accepcted:')
      //   console.log(signal)
      //   peer.signal(signal)
      // })
    }
  }

  function acceptCall(callerId, theSignalFromCaller) {
    console.log('Peer is accepting call')
    console.log(runOnce)
    console.log('Accepting Call: ' + callAccepted)
    if (!callAccepted) {
      let currS = null
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          currS = stream
          // console.log('Innner')
          // console.log(currS)
          // console.log(stream)
          const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
          })

          peer.on('signal', (data) => {
            console.log('Accept call signal: ')
            console.log(data)
            videoSocket.emit('acceptCall', { signal: data, to: callerId })
          })

          peer.on('stream', (stream) => {
            partnerVideo.current.srcObject = stream
            console.log('The stream for my partner in Accept Call: ')
            console.log(stream)
          })

          console.log('Accepting Call Func')
          console.log(theSignalFromCaller)
          // peer.signal(callerSignal)
          peer.signal(theSignalFromCaller)

          setCallAccepted(true)
        })

      console.log('currS:')
      console.log(currS)
      // const peer = new Peer({
      //   initiator: false,
      //   trickle: false,
      //   stream: stream,
      // })

      // peer.on('signal', (data) => {
      //   console.log('Accept call signal: ')
      //   console.log(data)
      //   videoSocket.emit('acceptCall', { signal: data, to: callerId })
      // })

      // peer.on('stream', (stream) => {
      //   partnerVideo.current.srcObject = stream
      //   console.log('The stream for my partner in Accept Call: ')
      //   console.log(stream)
      // })

      // console.log('Accepting Call Func')
      // console.log(theSignalFromCaller)
      // // peer.signal(callerSignal)
      // peer.signal(theSignalFromCaller)

      // setCallAccepted(true)
    }
  }

  return (
    <Box className={classes.videoContainer}>
      <Box className={classes.videoWrapper}>
        {/* My Video */}
        <Box className={classes.videoBox}>
          <video
            className={classes.video}
            playsInline
            muted
            ref={userVideo}
            autoPlay
          />
          <Typography variant="caption" className={classes.names}>
            {`${user?.firstname} ${user?.lastname}` || 'Dummy Name'}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.videoWrapper}>
        {/* <Box className={classes.videoWrapper}>
        {callAccepted && <Video playsInline ref={partnerVideo} autoPlay />}
      </Box> */}
        <Box className={classes.videoBox}>
          {callAccepted && (
            <video
              className={classes.video}
              playsInline
              muted
              ref={partnerVideo}
              autoPlay
            />
          )}
          <Typography variant="caption" className={classes.names}>
            {/* {`${partnerName}` || 'Dummy Name'} */}
            {'Dummy Name'}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Conferencing
