import React, { useState, useEffect } from 'react'
import { Container, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
require('codemirror/mode/python/python.js')
import { Controlled as CodeMirror } from 'react-codemirror2'

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
  const { value, onChange } = props
  Editor.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    isEditable: PropTypes.bool,
  }

  const classes = useStyles()
  const handleChange = (editor, data, value) => {
    if (props.isEditable) {
      onChange(value)
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

const CodeDisplay = (props) => {
  CodeDisplay.propTypes = {
    initialCode: PropTypes.string,
    editable: PropTypes.bool,
  }

  const classes = useStyles()
  const [code, setCode] = useState(props.initialCode)
  const [editable, setEditable] = useState(props.editable)

  useEffect(() => {
    setCode(props.initialCode)
    setEditable(props.editable)
  }, [props.initialCode])

  return (
    <Container disableGutters className={classes.root} maxWidth="xl">
      <Editor value={code} onChange={setCode} isEditable={editable} />
    </Container>
  )
}

export default CodeDisplay
