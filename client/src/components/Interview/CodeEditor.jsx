import React, { useState, useEffect } from 'react'
import { Container, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { updateCode } from '../../api/interview'
import { useDebouncedCallback } from 'use-debounce'
const randomColor = require('randomcolor')
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
require('codemirror/mode/python/python.js')
import { UnControlled as CodeMirrorEditor } from 'react-codemirror2'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { CodemirrorBinding } from 'y-codemirror'
import 'codemirror/mode/javascript/javascript.js'

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

const CodeEditor = (props) => {
  CodeEditor.propTypes = {
    rotationNum: PropTypes.number,
    codeSocket: PropTypes.object,
    initialCode: PropTypes.string,
    editable: PropTypes.bool,
    iSessionId: PropTypes.string,
    user: PropTypes.string,
  }

  const classes = useStyles()
  const { rotationNum, user, initialCode, editable, iSessionId } = props
  const [EditorRef, setEditorRef] = useState(null)
  const debounced = useDebouncedCallback((value) => {
    const data = {
      rotationNum: rotationNum,
      attempt: value,
    }
    updateCode(iSessionId, data)
  }, 2000)

  const handleChange = (editor, data, value) => {
    if (editable) {
      debounced(value)
    }
  }

  const handleEditorDidMount = (editor) => {
    setEditorRef(editor)
  }

  useEffect(() => {
    if (EditorRef) {
      const ydoc = new Y.Doc()
      const provider = new WebrtcProvider(iSessionId, ydoc)
      const awareness = provider.awareness
      awareness.setLocalStateField('user', {
        name: user,
        color: randomColor(),
      })
      const yText = ydoc.getText('codemirror')
      const yUndoManager = new Y.UndoManager(yText)
      const binding = new CodemirrorBinding(yText, EditorRef, awareness, {
        yUndoManager,
      })
      console.log('Codemirror Binding ', binding)
      return () => {
        if (provider) {
          provider.disconnect()
          ydoc.destroy()
        }
      }
    }
  }, [EditorRef])

  return (
    <Container disableGutters className={classes.root} maxWidth="xl">
      <Box className={classes.editorWrapper}>
        <CodeMirrorEditor
          value={initialCode}
          onChange={handleChange}
          autoCursor={false}
          options={{
            lineWrapping: true,
            lint: true,
            theme: 'material',
            lineNumbers: true,
            mode: 'python',
          }}
          editorDidMount={(editor) => {
            handleEditorDidMount(editor)
          }}
          className={classes.codeMirrorWrapper}
        />
      </Box>
    </Container>
  )
}

export default CodeEditor
