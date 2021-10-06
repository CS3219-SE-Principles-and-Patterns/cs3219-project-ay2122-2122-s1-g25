import React, { useState } from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

// code editor imports
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
require('codemirror/mode/javascript/javascript')

import { Controlled } from 'react-codemirror2'

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

const Editor = (props) => {
  const { language, value, onChange } = props
  Editor.propTypes = {
    language: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.string, // is function a string?
  }

  const classes = useStyles()
  const handleChange = (editor, data, value) => {
    onChange(value)
  }

  return (
    <Box className={classes.editorWrapper}>
      <Typography> {language} </Typography>
      <Controlled
        onBeforeChange={handleChange}
        value={value}
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true,
        }}
        className={classes.codeMirrorWrapper}
      />
    </Box>
  )
}

// make it dragabble in the future
const CodeEditor = () => {
  const classes = useStyles()
  const [js, setJs] = useState('')
  return (
    <Container disableGutters className={classes.root} maxWidth="xl">
      <Editor language="javascript" value={js} onChange={setJs} />
    </Container>
  )
}

export default CodeEditor
