import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  navbarDiv: {
    position: 'relative',
    backgroundColor: '#059be5',
    height: '100%',
    padding: '10px',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  logoutButtonDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#ffcb2b',
  },
  logoDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImg: {
    height: '35px',
    width: 'auto',
  },
  interviewRoleWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },
  roleDiv: {
    height: '100%',
    color: 'white',
    paddingRight: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  switchButton: {
    backgroundColor: '#ffcb2b',
  },
}))

const navbar = (props) => {
  const classes = useStyles()

  Role.propTypes = {
    currPage: PropTypes.string,
  }

  const roles = ['Interviewer', 'Interviewee'] // might need to passed via prop
  const [role, setRole] = useState(0) // 0 or 1 for interviewer & interviewee

  const onRotate = () => {
    // allow only 1 call / interview in the future
    role == 0 ? setRole(1) : setRole(0)
  }

  function Role(props) {
    if (props.currPage == 'interview') {
      return (
        <div className={classes.interviewRoleWrapper}>
          <div className={classes.roleDiv}>Role: {roles[role]}</div>
          <Button
            variant="contained"
            size="small"
            className={classes.switchButton}
            onClick={() => onRotate()}
          >
            Rotate
          </Button>
        </div>
      )
    }
    return <div></div>
  }

  return (
    <div className={classes.navbarDiv}>
      <div className={classes.logoDiv}>
        <img className={classes.logoImg} src={'/Upskill-Logo-White.png'} />
      </div>
      <Role currPage={props.currPage} />
      <div className={classes.logoutButtonDiv}>
        <Button
          variant="contained"
          size="small"
          className={classes.logoutButton}
        >
          Exit
        </Button>
      </div>
    </div>
  )
}

export default navbar
