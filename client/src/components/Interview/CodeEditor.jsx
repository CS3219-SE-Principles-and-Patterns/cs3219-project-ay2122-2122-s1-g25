import React, { useState, useEffect } from 'react'
import {
  Container,
  Box,
  Select,
  MenuItem,
  Typography,
  FormControl,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { updateCode } from '../../api/interview'
import { useDebouncedCallback } from 'use-debounce'
// code editor imports
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

// languages
require('codemirror/mode/python/python.js') //python
require('codemirror/mode/javascript/javascript.js') //javascript
require('codemirror/mode/css/css.js') // css
require('codemirror/mode/go/go.js')
require('codemirror/mode/markdown/markdown.js')

import { Controlled as CodeMirror } from 'react-codemirror2'

// imports
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  editorWrapper: {
    height: '100%',
  },
  codeMirrorWrapper: {
    height: '100%',
  },
  headerWrapper: {
    background: '#1a1b1c',
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codingPadTitle: {
    color: 'white',
  },
  dropDown: {
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.tertiary.main,
    paddingLeft: 10,
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
  const [language, setLanguage] = React.useState('python')

  const handleCodeChange = (event) => {
    setLanguage(event.target.value)
  }

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
      <Box className={classes.headerWrapper}>
        <Typography variant="subtitle2" className={classes.codingPadTitle}>
          Coding Pad
        </Typography>
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            onChange={handleCodeChange}
            className={classes.dropDown}
          >
            <MenuItem value={'python'}>Python</MenuItem>
            <MenuItem value={'javascript'}>Javascript</MenuItem>
            <MenuItem value={'css'}>CSS</MenuItem>
            <MenuItem value={'go'}>Go</MenuItem>
            <MenuItem value={'markdown'}>Markdown</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className={classes.editorWrapper}>
        <CodeMirror
          onBeforeChange={handleChange}
          value={code}
          options={{
            lineWrapping: true,
            lint: true,
            theme: 'material',
            lineNumbers: true,
            mode: language,
          }}
          className={classes.codeMirrorWrapper}
        />
      </Box>
    </Container>
  )
}

export default CodeEditor
