import React, { useState, useEffect } from 'react'

import { ListItem, ListItemText, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { getSession } from '../../api/history'
import { fetchStorage } from '../../storage'
import { convertTimestamp } from '../../views/Profile'

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
  const [users, setUsers] = useState([])
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
    if (user.userid === props.data.user0) {
      setPartner({
        userid: props.data.user1,
        firstname: props.data.user1firstname,
        lastname: props.data.user1lastname,
      })
    } else {
      setPartner({
        userid: props.data.user0,
        firstname: props.data.user0firstname,
        lastname: props.data.user0lastname,
      })
    }

    setUsers([
      {
        userid: props.data.user0,
        firstname: props.data.user0firstname,
        lastname: props.data.user0lastname,
      },
      {
        userid: props.data.user1,
        firstname: props.data.user1firstname,
        lastname: props.data.user1lastname,
      },
    ])

    // get rotation details
    getSession(props.data.isessionid)
      .then((res) => {
        setRotation(res.data.rotations)

        // Difficulty
        const diff = props.data.difficulty
        if (diff == 2) {
          setDifficulty('Hard')
        } else if (diff == 1) {
          setDifficulty('Medium')
        } else {
          setDifficulty('Easy')
        }

        // Date Time
        const createdAt = convertTimestamp(props.data.createdat)
        const parts = createdAt.split(', ')
        setDateTime([parts[0], parts[1]])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // get info before load
  useEffect(() => {
    if (rotation && partner && difficulty && dateTime && users) {
      setLoading(false)
    }
  }, [rotation, partner, difficulty, dateTime, users])

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
      onClick={() =>
        props.customClickEvent(props.id, rotation, partner, dateTime, users)
      }
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
              primary={`[Session #${props.data.isessionid}] Practiced with ${partner.firstname} ${partner.lastname}!`}
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
