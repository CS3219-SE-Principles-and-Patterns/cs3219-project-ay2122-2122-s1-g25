import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core'
import Navbar from '../../components/Navbar/HomeNavbar'
import SessionHistory from '../../components/History/SessionHistory'

const useStyles = makeStyles(() => ({
  homepageWrapper: {
    height: '100vh',
    minHeight: '100vh',
    maxHeight: '100vh',
  },
  navbarWrapper: {
    height: '15%',
    minHeight: '100px',
  },
  contentWrapper: {
    height: '85%',
    width: '100%',
    maxHeight: '85vh',

    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridGap: '10px',
    padding: '10px',
  },
  gridLeft: {
    height: '100%',
    maxHeight: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
  },
  gridRight: {
    backgroundColor: 'aqua',
    height: '100%',
    maxHeight: '100%',
  },
  greetingsGrid: {
    padding: '10px',
  },
  sessionHistoryGrid: {
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#e2e2e2',
    height: '100%',
  },
  sessionHistoryTitle: {
    fontWeight: 'bold',
    fontSize: 'medium',
  },
  sessionHistoryDivider: {
    marginTop: '10px',
    background: '#ffffff',
  },
  sessionHistoryListContainer: {
    position: 'relative',
    height: '95%',
  },
  sessionHistoryList: {
    position: 'absolute',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    overflow: 'auto',
  },
}))

const Home = () => {
  const classes = useStyles()

  return (
    <div className={classes.homepageWrapper}>
      <div className={classes.navbarWrapper}>
        <Navbar currPage={'Home Page'} />
      </div>
      <div className={classes.contentWrapper}>
        <div className={classes.gridLeft}>
          <div className={classes.greetingsGrid}>
            <div className="content-greetings-div">Welcome, Bobby!</div>
          </div>
          <div className={classes.sessionHistoryGrid}>
            <div className={classes.sessionHistoryTitle}>Session History</div>
            <Divider className={classes.sessionHistoryDivider} />
            <div className={classes.sessionHistoryListContainer}>
              <div className={classes.sessionHistoryList}>
                {[...Array(50)].map((i) => (
                  <SessionHistory key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.gridRight}>
          <div>Interview</div>
        </div>
      </div>
    </div>
  )
}

export default Home
