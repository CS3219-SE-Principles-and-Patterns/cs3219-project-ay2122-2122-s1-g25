import React, { useState, useEffect } from 'react'
import { Container, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { updateCode } from '../../api/interview'
import { useDebouncedCallback } from 'use-debounce'
// code editor imports
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

require('codemirror/mode/python/python.js') // can choose language to highlight

import { Controlled as CodeMirror } from 'react-codemirror2'

// imports
const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  editorWrapper: {
    height: '100%',
  },
  codeMirrorWrapper: {
    height: '100%',
  },
}))

// make it dragabble in the future
const CodeEditor = (props) => {
  CodeEditor.propTypes = {
    rotationNum: PropTypes.number,
    codeSocket: PropTypes.object,
    initialCode: PropTypes.string,
    editable: PropTypes.bool,
    iSessionId: PropTypes.string,
  }

  const classes = useStyles()
  const { rotationNum, codeSocket, initialCode, editable, iSessionId } = props
  const [code, setCode] = useState(initialCode)
  const debounced = useDebouncedCallback((value) => {
    const data = {
      rotationNum: rotationNum,
      attempt: value,
    }
    updateCode(iSessionId, data)
  }, 2000)

  useEffect(() => {
    setCode(initialCode)
  }, [initialCode])

  useEffect(() => {
    codeSocket.on('receive-code', (newCode) => {
      setCode(newCode)
    })
  }, [codeSocket])

  const handleChange = (editor, data, value) => {
    if (editable) {
      setCode(value)
      debounced(value)
      codeSocket.emit('send-code', value)
    }
  }

  return (
    <Container disableGutters className={classes.root} maxWidth="xl">
      <Box className={classes.editorWrapper}>
        <CodeMirror
          onBeforeChange={handleChange}
          value={code}
          options={{
            lineWrapping: true,
            lint: true,
            theme: 'material',
            lineNumbers: true,
            mode: 'python',
          }}
          className={classes.codeMirrorWrapper}
        />
      </Box>
    </Container>
  )
}

export default CodeEditor
