import React from 'react'
import { Container, Grid, Typography, Box, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    // backgroundColor: 'pink',
    overflowY: 'scroll',
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

// check with team what sld the input for question be
const tempQuestionData = {
  title: 'Pancake Sorting',
  question:
    'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n' +
    'You may assume that each input would have exactly one solution, and you may not use the same element twice.\n' +
    'You can return the answer in any order.',
  examples: [
    {
      example:
        'Input: nums = [2,7,11,15], target = 9 \n' +
        'Output: [0,1]\n' +
        'Output: Because nums[0] + nums[1] == 9, we return [0, 1].\n',
    },
    {
      example: 'Input: nums = [3,2,4], target = 6 \n' + 'Output: [1,2]\n',
    },
    {
      example: 'Input: nums = [3,3], target = 6 \n' + 'Output: [0,1]\n',
    },
  ],
}

const Example = (props) => {
  const classes = useStyles()
  Example.propTypes = {
    data: PropTypes.shape({
      example: PropTypes.string.isRequired,
    }),
    index: PropTypes.number,
  }

  return (
    <Box>
      <Typography variant="body2" className={classes.exampleHeader}>
        {'Example ' + props.index}
      </Typography>
      <Box className={classes.exampleItem}>
        <Typography variant="body2" className={classes.exampleWrapper}>
          {props.data.example}
        </Typography>
      </Box>
    </Box>
  )
}

// make it dragabble in the future
const AlgorithmQuestion = () => {
  const classes = useStyles()

  return (
    <Container className={classes.root} maxWidth="xl">
      <Grid container className={classes.gridWrapper}>
        <Typography variant="h6" className={classes.questionTitle}>
          {tempQuestionData.title}
        </Typography>
        <Divider className={classes.dividerStyle} />
        <Typography variant="body1" className={classes.questionContent}>
          {tempQuestionData.question}
        </Typography>
        <Box className={classes.exampleList}>
          {tempQuestionData.examples.map((data, index) => (
            <Example data={data} index={index} key={index} />
          ))}
        </Box>
      </Grid>
    </Container>
  )
}

export default AlgorithmQuestion
