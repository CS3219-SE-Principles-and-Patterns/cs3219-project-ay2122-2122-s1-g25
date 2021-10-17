import React from 'react'
import { Container, Grid, Typography, Box, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    // backgroundColor: 'pink',
    overflowY: 'auto',
  },
  gridWrapper: {
    paddingTop: '10px',
    height: '100%',
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
  },
  dividerStyle: {
    width: '100%',
  },
  questionTitle: {
    paddingTop: '10px',
    paddingBottom: '10px',
    fontWeight: '700',
  },
  questionContent: {
    padding: '10px 0px 10px 0px',
    whiteSpace: 'pre-line',
  },
  exampleList: {
    width: '100%',
    paddingTop: '10px',
  },
  exampleItem: {
    width: '100%',
    marginRight: '10px',
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: theme.palette.background.secondary,
    borderRadius: theme.shape.borderRadius,
  },
  exampleHeader: {
    fontWeight: '600',
  },
  exampleWrapper: {
    whiteSpace: 'pre-line',
  },
}))

const Example = (props) => {
  const classes = useStyles()
  Example.propTypes = {
    index: PropTypes.number.isRequired,
    input: PropTypes.string.isRequired,
    output: PropTypes.string.isRequired,
  }

  const { index, input, output } = props

  return (
    <Box>
      <Typography variant="body2" className={classes.exampleHeader}>
        {'Example ' + (index + 1)}
      </Typography>
      <Box className={classes.exampleItem}>
        <Typography variant="body2" className={classes.exampleWrapper}>
          {`Input: ${input}\nOutput: ${output}`}
        </Typography>
      </Box>
    </Box>
  )
}

// make it dragabble in the future
const AlgorithmQuestion = (props) => {
  AlgorithmQuestion.propTypes = {
    question: PropTypes.object.isRequired,
  }
  const classes = useStyles()
  const { question } = props

  return (
    <Container className={classes.root} maxWidth="xl">
      <Grid container className={classes.gridWrapper}>
        <Typography variant="subtitle1" className={classes.questionTitle}>
          {question.title}
        </Typography>
        <Divider className={classes.dividerStyle} />
        <Typography variant="body1" className={classes.questionContent}>
          {question.description}
        </Typography>
        <Box className={classes.exampleList}>
          {question.input.map((data, index) => (
            <Example
              input={data}
              output={question.output[index]}
              index={index}
              key={index}
            />
          ))}
        </Box>
      </Grid>
    </Container>
  )
}

export default AlgorithmQuestion
