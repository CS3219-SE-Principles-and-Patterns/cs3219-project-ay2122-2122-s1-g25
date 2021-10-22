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

const Video = (props) => {
  const classes = useStyles()
  const ref = useRef()

  Video.propTypes = {
    peer: PropTypes.object,
  }

  useEffect(() => {
    console.log('AAA')
    console.log(props)

    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((stream) => {
    //     ref.current.srcObject = stream
    //   })

    props.peer.on('stream', (stream) => {
      ref.current.srcObject = stream
    })
  }, [])

  return (
    <Box className={classes.videoBox}>
      <video className={classes.video} playsInline muted ref={ref} autoPlay />
      <Typography variant="caption" className={classes.names}>
        {'Dummy Name'}
      </Typography>
    </Box>
  )
}

const Conferencing = (props) => {
  const classes = useStyles()

  Conferencing.propTypes = {
    interviewSessionId: PropTypes.string,
  }

  const user = fetchStorage('user')

  const [peers, setPeers] = useState([])
  const userVideo = useRef()
  const peersRef = useRef([])
  // const roomID = props.match.params.roomID
  const roomID = props.interviewSessionId

  useEffect(() => {
    console.log('AA ' + roomID)
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream

        videoSocket.emit('join room', roomID)

        videoSocket.on('all users', (users) => {
          console.log('Received All Users: ')
          console.log(users)
          const peers = []
          users.forEach((userID) => {
            const peer = createPeer(userID, videoSocket.id, stream)
            peersRef.current.push({
              peerID: userID,
              peer,
            })
            peers.push(peer)
          })
          setPeers(peers)
        })

        // check
        videoSocket.on(roomID, (users) => {
          console.log('Received All Users: ')
          console.log(users)
        })

        videoSocket.on('user joined', (payload) => {
          console.log('User just joined or smth')

          // who is the one calling me
          const peer = addPeer(payload.signal, payload.callerID, stream)
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          })

          setPeers((users) => [...users, peer])
        })

        videoSocket.on('receiving returned signal', (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id)
          item.peer.signal(payload.signal)
        })
      })
  }, [videoSocket])

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    })

    peer.on('signal', (signal) => {
      videoSocket.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      })
    })

    return peer
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on('signal', (signal) => {
      videoSocket.emit('returning signal', { signal, callerID })
    })

    peer.signal(incomingSignal)

    return peer
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
        {peers.map((peer, index) => {
          return <Video key={index} peer={peer} />
        })}
      </Box>
    </Box>
  )
}

export default Conferencing
