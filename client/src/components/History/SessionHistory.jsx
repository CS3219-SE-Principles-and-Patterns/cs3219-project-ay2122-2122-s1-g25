import React, { useState, useEffect } from 'react'

import { ListItem, ListItemText, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { getSession, getPartner } from '../../api/history'
import { fetchStorage } from '../../storage'

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
  const [rotation, setRotation] = useState()
  const [partner, setPartner] = useState()
  const [loading, setLoading] = useState(true)
  const [difficulty, setDifficulty] = useState()
  const [dateTime, setDateTime] = useState()
  const user = fetchStorage('user')

  sessionHistory.propTypes = {
    data: PropTypes.object,
  }

  // History
  useEffect(() => {
    // get partner details
    const partnerId =
      user.userid == props.data.user0 ? props.data.user1 : props.data.user0

    getPartner(partnerId)
      .then((res) => {
        setPartner(res.data[0])
      })
      .catch((err) => {
        console.log(err)
      })

    // get rotation details
    getSession(props.data.isessionid)
      .then((res) => {
        setRotation(res.data.rotations)
        // console.log('Hah')
        // console.log(res.data)

        // Difficulty
        const diff = res.data.rotations[0].difficulty
        if (diff == 2) {
          setDifficulty('Hard')
        } else if (diff == 1) {
          setDifficulty('Medium')
        } else {
          setDifficulty('Easy')
        }

        // Date Time
        const createdAt = res.data.rotations[0].createdat
        let dt = new Date(createdAt)
        const date = dt.toISOString().slice(0, 10)
        var time = dt.toLocaleTimeString()
        setDateTime([date, time])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // get info before load
  useEffect(() => {
    if (rotation && partner && difficulty && dateTime) {
      setLoading(false)
    }
  }, [rotation, partner, difficulty, dateTime])

  // other functions
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
      onClick={() => props.customClickEvent(props.id, rotation, partner)}
      onMouseEnter={(e) => onHover(e)}
      onMouseLeave={(e) => onLeave(e)}
    >
      {!loading && (
        <Grid container className={classes.gridWrapper}>
          <Grid item xs={3} className={classes.dateWrapper}>
            <Typography variant="caption" className={classes.difficultyTypo}>
              {difficulty}
            </Typography>
            <Typography variant="overline">{dateTime[0]}</Typography>
            <Typography variant="caption">{dateTime[1]}</Typography>
          </Grid>
          <Grid item xs={9} className={classes.infoWrapper}>
            <ListItemText
              primary={`Practiced with @${partner.firstname} ${partner.lastname}!`}
            />
            <ListItemText secondary={`1. ${rotation[0].title}`} />
            <ListItemText secondary={`2. ${rotation[1].title}`} />
          </Grid>
        </Grid>
      )}
    </ListItem>
  )
}

export default sessionHistory
