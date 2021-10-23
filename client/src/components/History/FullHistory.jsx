import React, { useState } from 'react'

import { ListItem, Grid, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import HistoryQuestion from './HistoryQuestion'
// import CodeEditor from '../Interview/CodeEditor'
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'

import dynamic from 'next/dynamic'
const CodeDisplay = dynamic(import('../../components/History/CodeDisplay'), {
  ssr: false,
})

const useStyles = makeStyles((theme) => ({
  sessionHistoryItem: {
    backgroundColor: theme.palette.background.secondary,
    marginBottom: 8,
    borderRadius: theme.shape.borderRadius,
    padding: '10px',
  },
  gridWrapper: {},
  algorithmQnWrapper: {
    background: 'white',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
  },
  codeAttemptWrapper: {
    width: '100%',
  },
  codeAttemptEditor: {
    width: '100%',
    background: 'pink',
  },
  questionHeaderTypo: {
    paddingLeft: '10px',
    fontWeight: '700',
  },
  codeHeaderTypo: {
    paddingLeft: '10px',
    paddingTop: '20px',
    fontWeight: '700',
  },
  CloseIconWrapper: {
    width: '100%',
  },
  openIcon: {
    float: 'right',
    '&:hover': {
      opacity: '50%',
      cursor: 'pointer',
    },
  },
  closeIcon: {
    '&:hover': {
      opacity: '50%',
      cursor: 'pointer',
    },
  },
  closedContentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}))

const FullHistory = (props) => {
  FullHistory.propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      input: PropTypes.array,
      output: PropTypes.array,
      code: PropTypes.string.isRequired,
      attempt: PropTypes.string.isRequired,
    }),
  }
  const { data } = props
  const classes = useStyles()

  const [isOpen, setIsOpen] = useState(true)

  return (
    <ListItem className={classes.sessionHistoryItem}>
      <Grid container className={classes.gridWrapper}>
        <Box className={classes.CloseIconWrapper}>
          {isOpen && (
            <ExpandLessRoundedIcon
              className={classes.openIcon}
              onClick={() => setIsOpen(false)}
            />
          )}
          {!isOpen && (
            <Box className={classes.closedContentWrapper}>
              <Typography variant="body1">
                Click on down button to view content...
              </Typography>
              <ExpandMoreRoundedIcon
                className={classes.closeIcon}
                onClick={() => setIsOpen(true)}
              />
            </Box>
          )}
        </Box>
        <Box>
          {isOpen && (
            <Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  className={classes.questionHeaderTypo}
                >
                  Question:
                </Typography>
                <Box className={classes.algorithmQnWrapper}>
                  <HistoryQuestion questionData={props.data} />
                </Box>
              </Box>
              <Box className={classes.codeAttemptWrapper}>
                <Typography
                  variant="subtitle2"
                  className={classes.codeHeaderTypo}
                >
                  Code Attempt:
                </Typography>
                <Box className={classes.codeAttemptEditor}>
                  <CodeDisplay initialCode={data.attempt} editable={false} />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Grid>
    </ListItem>
  )
}

export default FullHistory
