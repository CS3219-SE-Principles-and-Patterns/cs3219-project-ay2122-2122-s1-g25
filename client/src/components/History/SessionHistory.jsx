import React from 'react'

import { Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  historyWrapper: {
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    margin: '10px 10px 0px 0px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftDiv: {
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rightDiv: {
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  difficultyDiv: {
    fontSize: 'medium',
  },
  dateDiv: {
    fontWeight: 'bold',
    fontSize: 'large',
  },
  timeDiv: {
    fontSize: '10px',
  },
  partnerDiv: {
    fontSize: 'large',
  },
  problemDiv: {
    marginLeft: '15px',
  },
}))

const sessionHistory = () => {
  const classes = useStyles()

  return (
    <div className={classes.historyWrapper}>
      <div className={classes.leftDiv}>
        <div className={classes.difficultyDiv}>Hard</div>
        <div className={classes.dateDiv}>15 Sep 2021</div>
        <div className={classes.timeDiv}>10.34pm - 11.15pm</div>
      </div>
      <Divider orientation="vertical" flexItem />
      <div className={classes.rightDiv}>
        <div className={classes.partnerDiv}>Praticed with @jiahua!</div>
        <div className={classes.problemDiv}>
          <ol>
            <li>Two Sum</li>
            <li>Maximum Subarray</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default sessionHistory
