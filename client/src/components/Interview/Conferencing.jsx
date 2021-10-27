import React, { useEffect, useRef, useState } from 'react'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import { ContextProvider, SocketContext } from './SocketContext'
// import { SocketContext } from './SocketContext'
import PropTypes from 'prop-types'

import { fetchStorage } from '../../storage'
import Peer from 'simple-peer'
import { videoSocket } from '../../config/socket'
// import MicIcon from '@material-ui/icons/Mic'
// import MicOffIcon from '@material-ui/icons/MicOff'

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
  micIcons: {
    color: 'white',
    '&:hover': {
      opacity: '50%',
      cursor: 'pointer',
    },
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
    partnerNum: PropTypes.string,
  }

  const user = fetchStorage('user')
  const myName = user?.firstname + ' ' + user?.lastname
  const userVideo = useRef()
  const partnerVideo = useRef()
  const [partnerName, setPartnerName] = useState()
  // const [audioMuted, setAudioMuted] = useState(true)
  const [myPeer, setMyPeer] = useState(null)

  // const [runOnce, setRunOnce] = useState(false)
  // const roomID = props.interviewSessionId

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream
        }
        console.log(stream)
      })

    // if (props.partnerNum < user.userid) {
    //   console.log('SMOL ')
    // } else {
    //   console.log('BIG ')
    // }
    // if (props.partnerNum >= user.userid) {
    //   console.log('SMOL ')
    // } else {
    //   console.log('BIG ')
    // }

    console.log('IDs: ' + props.partnerNum + ' , ' + user.userid)
    // if (partnerVideo === null) {
    videoSocket.on('successfully joined room', (message) => {
      console.log(message.successMsg)

      console.log(user.userid + ' ' + message.joinedId)
      console.log
      // if (props.partnerNum < user.userid) {
      //   console.log('SMOL ')
      // } else {
      //   console.log('BIG ')
      // }
      // if (props.partnerNum >= user.userid) {
      //   console.log('SMOL ')
      // } else {
      //   console.log('BIG ')
      // }
      // if (props.isInterviewee && message.joinedId == user.userid) {
      if (props.partnerNum < user.userid) {
        console.log('I am calling, this is me: ' + user.userid)
        // console.log(stream)
        try {
          callPeer()
        } catch (err) {
          console.log('err')
        }
      }
    })

    // if (!props.isInterviewee) {
    if (props.partnerNum >= user.userid) {
      videoSocket.on('hey', (data) => {
        console.log('I am receiving a call from: ' + data.from)
        setPartnerName(data.partnerName)
        // console.log(stream)

        // setCallerSignal(data.signal)
        // console.log(data.signal)
        acceptCall(data.from, data.signal)
      })
    }
    // }
    // }
    // })
  }, [])

  function callPeer() {
    try {
      console.log('Peer is being called')
      // console.log(runOnce)
      // if (!callAccepted) {
      console.log(myPeer)
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

            // console.log('This is the stream')
            // console.log(stream)
            peer.on('signal', (data) => {
              console.log('Peer signal this data sent:')
              console.log(data)

              videoSocket.emit('callUser', {
                signalData: data,
                from: user.userid,
                userName: myName,
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

            videoSocket.on('callAccepted', (data) => {
              // setCallAccepted(true)
              console.log('Call Accepcted:')
              setPartnerName(data.partnerName)
              console.log(data.signal)
              peer.signal(data.signal)
            })
          }
        })
    } catch (err) {
      console.log(err)
      callPeer()
    }
  }

  function acceptCall(callerId, theSignalFromCaller) {
    try {
      console.log('Peer is accepting call')
      // console.log(runOnce)
      // console.log('Accepting Call: ' + callAccepted)
      // if (!callAccepted) {
      let currS = null
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          currS = stream
          // console.log('Innner')
          // console.log(currS)
          // console.log(stream)
          console.log(myPeer)
          if (myPeer === null) {
            const peer = new Peer({
              initiator: false,
              trickle: false,
              stream: stream,
            })

            setMyPeer(peer)

            peer.on('signal', (data) => {
              console.log('Accept call signal: ')
              console.log(data)
              videoSocket.emit('acceptCall', {
                signal: data,
                to: callerId,
                userName: myName,
              })
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
          }

          // setCallAccepted(true)
        })

      console.log('currS:')
      console.log(currS)
    } catch (err) {
      console.log(err)
      callPeer()
    }
  }

  // const muteVideo = () => {
  //   console.log(audioMuted)
  //   setAudioMuted(true)
  // }

  // const unmuteVideo = () => {
  //   console.log(audioMuted)
  //   setAudioMuted(false)
  // }

  return (
    <Box className={classes.videoContainer}>
      <Box className={classes.videoWrapper}>
        {/* My Video */}
        <Box className={classes.videoBox}>
          <video
            className={classes.video}
            playsInline
            // muted={audioMuted}
            mutd={false}
            ref={userVideo}
            autoPlay
          />
          <Box className={classes.nameMicContainer}>
            <Typography variant="caption" className={classes.names}>
              {myName || 'Nameless'}
            </Typography>
            {/* {audioMuted && (
              <MicIcon
                className={classes.micIcons}
                onClick={() => unmuteVideo()}
              />
            )}
            {!audioMuted && (
              <MicOffIcon
                className={classes.micIcons}
                onClick={() => muteVideo()}
              />
            )} */}
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
