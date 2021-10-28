import React, { useEffect, useRef, useState } from 'react'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import Peer from 'simple-peer'
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

  // const { interviewSessionId, isInterviewee, partnerId, videoSocket, user } =
  // props
  const { user } = props
  const myName = user?.firstname + ' ' + user?.lastname
  const userVideo = useRef()
  const partnerVideo = useRef()
  const [partnerName, setPartnerName] = useState()
  // const [myPeer, setMyPeer] = useState(null)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream
        }
        console.log(stream)
        setPartnerName('My Partner')
      })
  }, [])
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
