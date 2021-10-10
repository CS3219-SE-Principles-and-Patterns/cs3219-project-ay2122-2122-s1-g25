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
}))

// will pass session id to db to get this data
const historyData = {
  difficulty: 'Hard',
  date: '25 Sep 2021',
  time: '9.05 pm - 11.12 pm',
}

const HistoryModal = (props) => {
  const classes = useStyles()
  const [modalData, setModalData] = useState({})

  useEffect(() => {
    // Update data from API
    // console.log(props.id)
    setModalData(historyData)
  }, [])

  HistoryModal.propTypes = {
    closeModal: PropTypes.function,
    id: PropTypes.number,
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
          <List>Hi</List>
        </Grid>
      </Box>
    </Container>
  )
}

export default HistoryModal
