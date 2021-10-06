import React, { useState } from 'react'
import { Container, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

// code editor imports
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

import { Controlled } from 'react-codemirror2'

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
    onChange: PropTypes.string, // is a function a string?
  }

  const classes = useStyles()
  const handleChange = (editor, data, value) => {
    onChange(value)
  }

  return (
    <Box className={classes.editorWrapper}>
      <Box className={classes.languageWrapper}></Box>
      <Controlled
        onBeforeChange={handleChange}
        value={value}
        options={{
          lineWrapping: true,
          lint: true,
          theme: 'material',
          lineNumbers: true,
        }}
        className={classes.codeMirrorWrapper}
      />
    </Box>
  )
}

const CodeEditor = () => {
  const classes = useStyles()
  const [code, setCode] = useState('')
  return (
    <Container disableGutters className={classes.root} maxWidth="xl">
      <Editor value={code} onChange={setCode} />
    </Container>
  )
}

export default CodeEditor
