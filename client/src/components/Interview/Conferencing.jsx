import React from 'react'

// import { Box } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'
import { ContextProvider } from './SocketContext'

import Video from './Video'

const Conferencing = () => {
  return (
    <ContextProvider>
      <Video />
    </ContextProvider>
  )
}

export default Conferencing
