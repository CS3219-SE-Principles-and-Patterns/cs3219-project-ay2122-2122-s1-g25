import React, { useEffect, useRef, useState } from 'react'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Peer from 'simple-peer'
import PropTypes from 'prop-types'

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
  nameMicContainer: {
    display: 'flex',
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
}))

const Conferencing = (props) => {
  const classes = useStyles()
  Conferencing.propTypes = {
    interviewSessionId: PropTypes.string,
    isInterviewee: PropTypes.boolean,
    partnerId: PropTypes.string,
    videoSocket: PropTypes.any,
    user: PropTypes.object,
  }

  const { isInterviewee, partnerId, videoSocket, user } = props
  const myName = user?.firstname + ' ' + user?.lastname
  const userVideo = useRef()
  const partnerVideo = useRef()
  const [partnerName, setPartnerName] = useState('Partner')
  const [myPeer, setMyPeer] = useState(null)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream
        }
        console.log('My stream: ', stream)
      })

    console.log('Partner: ' + partnerId + ' , Me: ' + user.userid)

    // Interviewee always makes the connection call
    if (isInterviewee) {
      try {
        callPeer()
      } catch (err) {
        console.log('Error calling peer')
      }
    } else {
      videoSocket.on('hey', (message) => {
        console.log('Receiving call from peer')
        setPartnerName(message.partnerName)
        acceptCall(message.from, message.signal)
      })
    }
  }, [])

  useEffect(() => {
    videoSocket.on('successfully joined room', (message) => {
      console.log(message.successMsg)
    })
  }, [videoSocket])

  const callPeer = () => {
    console.log('Calling peer')
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (myPeer === null) {
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
          setMyPeer(peer)

          peer.on('signal', (data) => {
            videoSocket.emit('callUser', {
              signalData: data,
              from: user.userid,
              userName: myName,
            })
          })
          peer.on('stream', (stream) => {
            if (partnerVideo.current) {
              partnerVideo.current.srcObject = stream
            }
          })
          videoSocket.on('callAccepted', (data) => {
            setPartnerName(data.partnerName)
            peer.signal(data.signal)
          })
        }
      })
  }

  const acceptCall = (callerId, theSignalFromCaller) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (myPeer === null) {
          const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
          })
          setMyPeer(peer)

          peer.on('signal', (data) => {
            videoSocket.emit('acceptCall', {
              signal: data,
              to: callerId,
              userName: myName,
            })
          })

          peer.on('stream', (stream) => {
            partnerVideo.current.srcObject = stream
          })

          peer.signal(theSignalFromCaller)
        }
      })
  }

  return (
    <Box className={classes.videoContainer}>
      <Box className={classes.videoWrapper}>
        {/* My Video */}
        <Box className={classes.videoBox}>
          <video
            className={classes.video}
            playsInline
            // muted={audioMuted}
            muted={false}
            ref={userVideo}
            autoPlay
          />
          <Box className={classes.nameMicContainer}>
            <Typography variant="caption" className={classes.names}>
              {myName || 'Nameless'}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/*  Partner Video */}
      <Box className={classes.videoWrapper}>
        <Box className={classes.videoBox}>
          <video
            className={classes.video}
            playsInline
            muted={false}
            ref={partnerVideo}
            autoPlay
          />
          <Typography variant="caption" className={classes.names}>
            {`${partnerName}` || 'Partner video is not connected'}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Conferencing
