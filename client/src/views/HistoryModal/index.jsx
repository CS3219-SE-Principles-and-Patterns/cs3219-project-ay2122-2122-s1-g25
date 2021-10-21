import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {
  Container,
  Box,
  Grid,
  Typography,
  List,
  Divider,
  Button,
} from '@material-ui/core'

import CloseIcon from '@material-ui/icons/Close'
import FullHistory from '../../components/History/FullHistory'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  modalWrapper: {
    height: '90%',
    width: '100%',
    backgroundColor: 'white',
  },
  gridWrapper: {
    height: '100%',
    width: '100%',
    padding: '10px',

    overflowY: 'auto',
  },
  historyHeadingWrapper: {
    paddingBottom: '10px',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftHeaderContentWrapper: {},
  dateTimeTypo: {
    paddingLeft: '20px',
  },
  contentDivider: {
    width: '100%',
  },
  closeIconStyle: {
    '&:hover': {
      opacity: '50%',
      cursor: 'pointer',
    },
  },
  titleTypo: {
    paddingLeft: '10px',
    fontWeight: '700',
  },
  historyList: {},
  titleAndPeopleBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
}))

// will pass session id to db to get this data
const historyData = {
  difficulty: 'Hard',
  date: '25 Sep 2021',
  time: '9.05 pm - 11.12 pm',
  codeAttempts: [
    {
      interviewer: 'Bobby',
      interviewee: 'Jia Hua',
      title: 'Pancake Sorting',
      question:
        'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n' +
        'You may assume that each input would have exactly one solution, and you may not use the same element twice.\n' +
        'You can return the answer in any order.',
      input: ['nums = [2,7,11,15], target = 9 \n'],
      output: ['Output: [0,1]\n'],
      code: 'a = 1\na = a + a',
    },
    {
      interviewer: 'Jia Hua',
      interviewee: 'Bobby',
      title: '2 Sum',
      question:
        'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n' +
        'You may assume that each input would have exactly one solution, and you may not use the same element twice.\n' +
        'You can return the answer in any order.',
      input: ['nums = [2,7,11,15], target = 9 \n'],
      output: ['Output: [0,1]\n'],
      code: 'a = [1, 2, 3]\nreturn a',
    },
  ],
}

const QuestionWrapper = (props) => {
  const classes = useStyles()
  QuestionWrapper.propTypes = {
    index: PropTypes.number,
    data: PropTypes.shape(),
  }

  const { index, data } = props

  return (
    <Box>
      <Box className={classes.titleAndPeopleBox}>
        <Typography variant="subtitle1" className={classes.titleTypo}>
          {`Question ${index + 1}. ${data.title}`}
        </Typography>
        <Typography variant="body1" className={classes.interviewerDetails}>
          {`Interviewer: ${data.interviewer}, Interviewee: ${data.interviewee}`}
        </Typography>
      </Box>
      <FullHistory data={data} index={index} />
    </Box>
  )
}

const HistoryModal = (props) => {
  const classes = useStyles()
  const [modalData, setModalData] = useState({})
  const [qnData, setQnData] = useState([])

  useEffect(() => {
    // Update data from API
    // console.log(props.id)
    setModalData(historyData)
    setQnData(historyData.codeAttempts)
  }, [])

  HistoryModal.propTypes = {
    closeModal: PropTypes.func,
    id: PropTypes.string,
  }

  return (
    <Container className={classes.root} maxWidth="lg" disableGutters>
      <Box className={classes.modalWrapper}>
        <Grid item className={classes.gridWrapper}>
          <Grid item className={classes.historyHeadingWrapper}>
            <Grid item className={classes.leftHeaderContentWrapper}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                className={classes.difficultyButton}
              >
                {modalData.difficulty}
              </Button>
              <Typography variant="button" className={classes.dateTimeTypo}>
                {modalData.date}
              </Typography>
              <Typography variant="overline" className={classes.dateTimeTypo}>
                {modalData.time}
              </Typography>
            </Grid>
            <CloseIcon
              onClick={props.closeModal}
              className={classes.closeIconStyle}
            />
          </Grid>
          <Divider className={classes.contentDivider} />
          <List className={classes.historyList}>
            {qnData.map((data, index) => (
              <QuestionWrapper key={index} data={data} index={index} />
            ))}
          </List>
        </Grid>
      </Box>
    </Container>
  )
}

export default HistoryModal
