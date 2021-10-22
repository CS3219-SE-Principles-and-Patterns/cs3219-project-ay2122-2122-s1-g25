import React, { useState, useEffect } from 'react'
import { Container, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { updateCode } from '../../api/interview'
import { useDebounce } from 'use-debounce'
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
  languageWrapper: {
    display: 'flex',
  },
  codeMirrorWrapper: {
    height: '100%',
  },
}))

const Editor = (props) => {
  Editor.propTypes = {
    codeSocket: PropTypes.object,
    value: PropTypes.string,
    onChange: PropTypes.func,
    isEditable: PropTypes.bool,
  }
  const { codeSocket, value, onChange, isEditable } = props
  const classes = useStyles()
  const handleChange = (editor, data, value) => {
    if (isEditable) {
      onChange(value)
      codeSocket.emit('send-code', value)
    }
  }

  return (
    <Box className={classes.editorWrapper}>
      <CodeMirror
        onBeforeChange={handleChange}
        value={value}
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
  )
}

// make it dragabble in the future
const CodeEditor = (props) => {
  CodeEditor.propTypes = {
    rotationNum: PropTypes.number,
    codeSocket: PropTypes.object,
    initialCode: PropTypes.string,
    editable: PropTypes.bool,
  }

  const classes = useStyles()
  const { rotationNum, codeSocket, initialCode } = props
  const [code, setCode] = useState(initialCode)
  const [editable, setEditable] = useState(props.editable)
  const debounceCode = useDebounce(code, 2000)

  const getInterviewSessionId = () => {
    const pathname = window.location.pathname
    const iSessionId = pathname.substring(pathname.lastIndexOf('/') + 1)
    return iSessionId
  }

  useEffect(() => {
    setCode(initialCode)
    setEditable(editable)
  }, [initialCode])

  useEffect(() => {
    codeSocket.on('receive-code', (newCode) => {
      setCode(newCode)
    })
  }, [codeSocket])

  useEffect(() => {
    const data = {
      rotationNum: rotationNum,
      attempt: code,
    }
    updateCode(getInterviewSessionId(), data)
  }, [debounceCode])

  return (
    <Container disableGutters className={classes.root} maxWidth="xl">
      <Editor
        codeSocket={codeSocket}
        value={code}
        onChange={setCode}
        isEditable={editable}
      />
    </Container>
  )
}

export default CodeEditor
