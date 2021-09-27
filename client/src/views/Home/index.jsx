import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Divider, Button } from '@material-ui/core'
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
    gridTemplateColumns: '50% auto',
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
    backgroundColor: '#e2e2e2',
    height: '100%',
    maxHeight: '100%',
    padding: '10px',
    borderRadius: '8px',
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
  mockInterviewTitle: {
    fontWeight: 'bold',
    fontSize: 'medium',
  },
  mockInterviewGreetings: {
    marginTop: '10px',
    marginBottom: '20px',
  },
  interviewButtonsContainer: {
    position: 'relative',
    height: '85%',
  },
  interviewButtonsWrapper: {
    position: 'absolute',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    overflow: 'auto',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  interviewButtonDiv: {
    width: '100%',
    '& Button': {
      width: '100%',
      minHeight: '100px',
      marginTop: '20px',
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
  easyButton: {
    backgroundColor: '#ffcb2b',
  },
  moderateButton: {
    backgroundColor: '#ffa611',
  },
  hardButton: {
    backgroundColor: '#f6820d',
  },
  matchButton: {
    backgroundColor: '#059be5',
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
          <div className={classes.mockInterviewTitle}>
            Mock Interview Session
          </div>
          <Divider className={classes.sessionHistoryDivider} />
          <div className={classes.mockInterviewGreetings}>
            {" Let's get started by selecting your desired difficulty!"}
          </div>
          <div className={classes.interviewButtonsContainer}>
            <div className={classes.interviewButtonsWrapper}>
              <div>
                <div className={classes.interviewButtonDiv}>
                  <Button
                    variant="contained"
                    size="large"
                    className={classes.easyButton}
                  >
                    Easy
                  </Button>
                </div>
                <div className={classes.interviewButtonDiv}>
                  <Button
                    variant="contained"
                    size="large"
                    className={classes.moderateButton}
                  >
                    Moderate
                  </Button>
                </div>
                <div className={classes.interviewButtonDiv}>
                  <Button
                    variant="contained"
                    size="large"
                    className={classes.hardButton}
                  >
                    Hard
                  </Button>
                </div>
              </div>
              <div className={classes.interviewButtonDiv}>
                <Button
                  variant="contained"
                  size="large"
                  className={classes.matchButton}
                >
                  Find a Partner!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
