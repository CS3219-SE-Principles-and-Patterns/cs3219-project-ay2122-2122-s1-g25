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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  difficultyTypo: {
    fontWeight: 600,
  },
}))

const sessionHistory = (props) => {
  const classes = useStyles()

  return (
    <ListItem
      className={classes.sessionHistoryItem}
      onClick={() => props.customClickEvent(props.id)}
    >
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
