import React from 'react'

import { ListItem, ListItemText, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  sessionHistoryItem: {
    background: theme.palette.background.main,
    marginBottom: 8,
    borderRadius: theme.shape.borderRadius,
  },
  gridWrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateWrapper: {
    // height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  difficultyTypo: {
    fontWeight: 600,
  },
}))

const sessionHistory = () => {
  const classes = useStyles()

  return (
    // <div className={classes.historyWrapper}>
    //   <div className={classes.leftDiv}>
    //     <div className={classes.difficultyDiv}>Hard</div>
    //     <div className={classes.dateDiv}>15 Sep 2021</div>
    //     <div className={classes.timeDiv}>10.34pm - 11.15pm</div>
    //   </div>
    //   <Divider orientation="vertical" flexItem />
    //   <div className={classes.rightDiv}>
    //     <div className={classes.partnerDiv}>Praticed with @jiahua!</div>
    //     <div className={classes.problemDiv}>
    //       <ol>
    //         <li>Two Sum</li>
    //         <li>Maximum Subarray</li>
    //       </ol>
    //     </div>
    //   </div>
    // </div>
    <ListItem className={classes.sessionHistoryItem}>
      <Grid container className={classes.gridWrapper}>
        <Grid item xs={3} className={classes.dateWrapper}>
          <Typography variant="caption" className={classes.difficultyTypo}>
            Hard
          </Typography>
          <Typography variant="overline">15 Sep 2021</Typography>
          <Typography variant="caption">10.34pm - 11.15pm</Typography>
        </Grid>
        <Grid item xs={9} className={classes.infoWrapper}>
          <ListItemText primary="Practiced with @jiahua!" />
          <ListItemText secondary={'1. ' + 'Two Sum'} />
          <ListItemText secondary={'2. ' + 'Maximum Subarray'} />
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default sessionHistory
