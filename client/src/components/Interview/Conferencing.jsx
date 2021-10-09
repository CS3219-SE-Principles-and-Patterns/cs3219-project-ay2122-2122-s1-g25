import React, { useContext } from 'react'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import { ContextProvider, SocketContext } from './SocketContext'
import { SocketContext } from './SocketContext'
import { fetchStorage } from '../../storage'

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

const Conferencing = () => {
  const classes = useStyles()
  const { callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext)

  const user = fetchStorage('user')

  return (
    <Box className={classes.videoContainer}>
      <Box className={classes.videoWrapper}>
        {/* My Video */}
        {stream && (
          <Box className={classes.videoBox}>
            <video
              className={classes.video}
              playsInline
              muted
              ref={myVideo}
              autoPlay
            />
            <Typography variant="caption" className={classes.names}>
              {`${user?.firstname} ${user?.lastname}` || 'Dummy Name'}
            </Typography>
          </Box>
        )}
        {!stream && (
          <Box className={classes.videoBox}>
            <Typography variant="caption" className={classes.names}>
              No video detected for Name
            </Typography>
          </Box>
        )}
      </Box>
      <Box className={classes.videoWrapper}>
        {/*Other User's  Video */}
        {callAccepted && !callEnded && (
          <Box className={classes.videoBox}>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
            <Typography variant="caption" className={classes.names}>
              {call.name || 'Name'}
            </Typography>
          </Box>
        )}
        {!callAccepted && (
          <Box className={classes.videoBox}>
            <Typography variant="caption" className={classes.names}>
              No video detected for Partner
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Conferencing
