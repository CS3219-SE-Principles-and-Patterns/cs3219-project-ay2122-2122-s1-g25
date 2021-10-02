import React from 'react'
import { Button, Container, Grid, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

let upskillHomepageRoutes = ['Home Page', 'Profile'] // hardcoded route

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
  },
  gridWrapper: {
    height: '100%',
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    paddingTop: '20px',
  },
  leftWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logoWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routerWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  routeGroup: {
    marginRight: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&:hover': {
      opacity: '80%',
      cursor: 'pointer',
    },
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
  routeTypo: {
    color: 'white',
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
    <Container className={classes.root} maxWidth="xl">
      <Grid container className={classes.gridWrapper}>
        <Grid item className={classes.leftWrapper}>
          <Box className={classes.logoWrapper}>
            <img src={'/Upskill-Logo-White.png'} />
          </Box>
          <Grid item className={classes.routerWrapper}>
            {upskillHomepageRoutes.map((currRoute) => (
              <Box key={currRoute} className={classes.routeGroup}>
                <Typography variant="caption" className={classes.routeTypo}>
                  {currRoute}
                </Typography>
                <RoutePointer
                  currPage={props.currPage}
                  currCheckedRoute={currRoute}
                />
              </Box>
            ))}
          </Grid>
        </Grid>
        <Box className={classes.buttonWrapper}>
          <Button variant="contained" color="secondary" type="submit">
            Sign Out
          </Button>
        </Box>
      </Grid>
    </Container>
  )
}

export default navbar
