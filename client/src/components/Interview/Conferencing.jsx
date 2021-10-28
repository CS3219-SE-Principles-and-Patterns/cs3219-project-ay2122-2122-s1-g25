import React, { useEffect, useRef, useState } from 'react'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
// import Peer from 'peerjs'

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

const Conferencing = (props) => {
  const classes = useStyles()
  Conferencing.propTypes = {
    interviewSessionId: PropTypes.string,
    isInterviewee: PropTypes.bool,
    partnerId: PropTypes.string,
    videoSocket: PropTypes.any,
    user: PropTypes.object,
  }

  const { interviewSessionId, videoSocket, user } = props
  const myName = user?.firstname + ' ' + user?.lastname
  const userVideo = useRef()
  const partnerVideo = useRef()
  const [partnerName, setPartnerName] = useState()
  const [peer, setPeer] = useState()
  const [importComplete, setImportComplete] = useState()
  // const peer = new Peer(undefined, {})

  useEffect(() => {
    import('peerjs').then(({ default: Peer }) => {
      // const newPeer = new Peer(undefined, {})
      const newPeer = new Peer()
      newPeer.on('open', () => {
        videoSocket.emit('joinRoom', {
          roomId: interviewSessionId,
          userId: user.userid,
        })
      })
      setPeer(newPeer)
      setImportComplete(true)
    })
  }, [])

  useEffect(() => {
    if (importComplete) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (userVideo.current) {
            userVideo.current.srcObject = stream
          }
          console.log(stream)
          setPartnerName('My Partner')
          peer.on('call', (call) => {
            console.log('Receiving call!')
            call.answer(stream)
            call.on('stream', (userVideoStream) => {
              partnerVideo.current.srcObject = userVideoStream
            })
          })

          videoSocket.on('user-connected', (userId) => {
            console.log('Person coming: ', userId)
            connectToPartner(userId, stream)
          })
        })
    }
  }, [importComplete])

  const connectToPartner = (userId, stream) => {
    const call = peer.call(userId, stream)
    console.log('Sending call!')
    call.on('stream', (userVideoStream) => {
      console.log(userVideoStream)
      partnerVideo.current.srcObject = userVideoStream
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
            muted={true}
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
            muted={true}
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
