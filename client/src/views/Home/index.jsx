import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Divider, Button } from '@material-ui/core'
// import Navbar from '../../components/Navbar/HomeNavbar'
import SessionHistory from '../../components/History/SessionHistory'
import HomeLayout from '../../components/Layout/HomeLayout'

const useStyles = makeStyles(() => ({
  contentWrapper: {
    height: '100%',
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
  greetingsDiv: {
    fontSize: '28px',
    fontWeight: 'bold',
  },
  sessionHistoryGrid: {
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#e2e2e2',
    height: '100%',
  },
  sessionHistoryTitle: {
    fontWeight: 'bold',
    fontSize: '20px',
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
    fontSize: '20px',
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
  activeButton: {
    backgroundColor: 'grey',
  },
}))

const Home = () => {
  const classes = useStyles()
  const [buttonClicked, setButtonClicked] = useState(0)
  const loops = Array.from(Array(50).keys())

  const onDifficultySelection = (buttonNo, event) => {
    console.log(event.currentTarget.id)
    if (buttonClicked == 0) {
      setButtonClicked(buttonNo)
      document
        .getElementById(event.currentTarget.id)
        .classList.add(classes.activeButton)
    } else {
      if (buttonNo == buttonClicked) {
        setButtonClicked(0)
        document
          .getElementById(event.currentTarget.id)
          .classList.remove(classes.activeButton)
      } else {
        document
          .getElementById(buttonClicked + '')
          .classList.remove(classes.activeButton)
        document
          .getElementById(event.currentTarget.id)
          .classList.add(classes.activeButton)
        setButtonClicked(buttonNo)
      }
    }
  }

  return (
    <HomeLayout currPage="Home Page">
      <div className={classes.contentWrapper}>
        <div className={classes.gridLeft}>
          <div className={classes.greetingsGrid}>
            <div className={classes.greetingsDiv}>Welcome, Bobby!</div>
          </div>
          <div className={classes.sessionHistoryGrid}>
            <div className={classes.sessionHistoryTitle}>Session History</div>
            <Divider className={classes.sessionHistoryDivider} />
            <div className={classes.sessionHistoryListContainer}>
              <div className={classes.sessionHistoryList}>
                {loops.map((i) => (
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
                    id="1"
                    variant="contained"
                    size="large"
                    className={classes.easyButton}
                    onClick={(e) => onDifficultySelection(1, e)}
                  >
                    Easy
                  </Button>
                </div>
                <div className={classes.interviewButtonDiv}>
                  <Button
                    id="2"
                    variant="contained"
                    size="large"
                    className={classes.moderateButton}
                    onClick={(e) => onDifficultySelection(2, e)}
                  >
                    Moderate
                  </Button>
                </div>
                <div className={classes.interviewButtonDiv}>
                  <Button
                    id="3"
                    variant="contained"
                    size="large"
                    className={classes.hardButton}
                    onClick={(e) => onDifficultySelection(3, e)}
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
    </HomeLayout>
  )
}

export default Home
