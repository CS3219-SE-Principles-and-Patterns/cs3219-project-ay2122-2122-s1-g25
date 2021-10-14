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
  hoverBackground: {
    opacity: '70%',
  },
}))

const sessionHistory = (props) => {
  const classes = useStyles()

  const onHover = (event) => {
    document
      .getElementById(event.currentTarget.id)
      .classList.add(classes.hoverBackground)
  }

  const onLeave = (event) => {
    document
      .getElementById(event.currentTarget.id)
      .classList.remove(classes.hoverBackground)
  }

  return (
    <ListItem
      id={props.id + ''}
      className={classes.sessionHistoryItem}
      onClick={() => props.customClickEvent(props.id)}
      onMouseEnter={(e) => onHover(e)}
      onMouseLeave={(e) => onLeave(e)}
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
