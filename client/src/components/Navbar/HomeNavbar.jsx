import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

let upskillHomepageRoutes = ['Home Page', 'Profile'] // hardcoded route

const useStyles = makeStyles(() => ({
  navbarDiv: {
    position: 'relative',
    backgroundColor: '#059be5',
    height: '100%',
  },
  logoutButtonDiv: {
    float: 'right',
    margin: '10px',
  },
  logoutButton: {
    backgroundColor: '#ffcb2b',
  },
  logoDiv: {
    padding: '10px',
    height: '100%',
    paddingTop: '20px',
    paddingBottom: '10px',
  },
  routesDiv: {
    display: 'flex',
    position: 'absolute',
    bottom: '0',
  },
  routeGroup: {
    marginRight: '10px',
    marginLeft: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '&:hover': {
      opacity: '80%',
      cursor: 'pointer',
    },
  },
  routeFont: {
    fontSize: 'small',
    color: 'white',
  },
  routePointer: {
    width: '50px',
    height: '5px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    border: '1px solid white',
    backgroundColor: 'white',
  },
  routePointerHide: {
    visibility: 'hidden',
    width: '50px',
    height: '5px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    border: '1px solid white',
    backgroundColor: 'white',
  },
}))

const navbar = (props) => {
  const classes = useStyles()

  RoutePointer.propTypes = {
    currPage: PropTypes.string,
    currCheckedRoute: PropTypes.string,
  }

  function RoutePointer(props) {
    if (props.currPage == props.currCheckedRoute) {
      return <div className={classes.routePointer}></div>
    }
    return <div className={classes.routePointerHide}></div>
  }

  return (
    <div className={classes.navbarDiv}>
      <div className={classes.logoutButtonDiv}>
        <Button
          variant="contained"
          size="small"
          className={classes.logoutButton}
        >
          Sign Out
        </Button>
      </div>
      <div>
        <div className={classes.logoDiv}>
          <img src={'/Upskill-Logo-White.png'} />
        </div>
        <div className={classes.routesDiv}>
          {upskillHomepageRoutes.map((currRoute) => (
            <div key={currRoute} className={classes.routeGroup}>
              <div className={classes.routeFont}>{currRoute}</div>
              <RoutePointer
                currPage={props.currPage}
                currCheckedRoute={currRoute}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default navbar
