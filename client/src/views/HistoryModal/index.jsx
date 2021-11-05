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

const QuestionWrapper = (props) => {
  const classes = useStyles()
  QuestionWrapper.propTypes = {
    index: PropTypes.number,
    data: PropTypes.object,
    partner: PropTypes.object,
    rotationnum: PropTypes.number,
    users: PropTypes.array,
  }

  const { index, data, rotationnum, users } = props

  return (
    <Box>
      <Box className={classes.titleAndPeopleBox}>
        <Typography variant="subtitle1" className={classes.titleTypo}>
          {`Question ${index + 1}. ${data.title}`}
        </Typography>
        <Typography variant="body1" className={classes.interviewerDetails}>
          {`Interviewer: ${
            rotationnum == 0
              ? users[1]?.firstname + ' ' + users[1]?.lastname
              : users[0].firstname + ' ' + users[0].lastname
          }, Interviewee: ${
            rotationnum == 0
              ? users[0].firstname + ' ' + users[0].lastname
              : users[1]?.firstname + ' ' + users[1]?.lastname
          }`}
        </Typography>
      </Box>
      <FullHistory data={data} index={index} />
    </Box>
  )
}

const HistoryModal = (props) => {
  const classes = useStyles()

  const [loading, setLoading] = useState(true)
  const [difficulty, setDifficulty] = useState()

  const partner = props.partner

  useEffect(() => {
    const diff = props.rotations[0].difficulty
    if (diff == 2) {
      setDifficulty('Hard')
    } else if (diff == 1) {
      setDifficulty('Medium')
    } else {
      setDifficulty('Easy')
    }
  }, [])

  useEffect(() => {
    if (difficulty) {
      setLoading(false)
    }
  }, [difficulty])

  HistoryModal.propTypes = {
    closeModal: PropTypes.func,
    id: PropTypes.string,
    partner: PropTypes.object,
    rotations: PropTypes.array,
    dateTime: PropTypes.array,
    users: PropTypes.array,
  }

  return (
    <Container className={classes.root} maxWidth="lg" disableGutters>
      {!loading && (
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
                  {difficulty}
                </Button>
                <Typography variant="button" className={classes.dateTimeTypo}>
                  {props.dateTime[0]}
                </Typography>
                <Typography variant="overline" className={classes.dateTimeTypo}>
                  {props.dateTime[1]}
                </Typography>
              </Grid>
              <CloseIcon
                onClick={props.closeModal}
                className={classes.closeIconStyle}
              />
            </Grid>
            <Divider className={classes.contentDivider} />
            <List className={classes.historyList}>
              {props.rotations.map((data, index) => (
                <QuestionWrapper
                  key={index}
                  data={data}
                  index={index}
                  partner={partner}
                  users={props.users}
                  rotationnum={props.rotations[index].rotationnum}
                />
              ))}
            </List>
          </Grid>
        </Box>
      )}
    </Container>
  )
}

export default HistoryModal
