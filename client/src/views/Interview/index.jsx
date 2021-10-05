import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Box } from '@material-ui/core'
import AuthWrapper from '../../components/Authentication/AuthWrapper'
import InterviewLayout from '../../components/Layout/InterviewLayout'
import AlgorithmQuestion from '../../components/Interview/AlgorithmQuestion'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    // background: 'pink',
  },
  gridWrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridLeft: {
    height: '100%',
  },
  gridRight: {
    height: '100%',
  },
  codeWrapper: {
    height: '70%',
    // backgroundColor: 'yellow',
  },
  questionWrapper: {
    height: '30%',
    // backgroundColor: 'orange',
  },
  videoWrapper: {
    height: '30%',
    // backgroundColor: 'green',
  },
  chatWrapper: {
    height: '70%',
    // backgroundColor: 'aqua',
  },
}))

const Interview = () => {
  const classes = useStyles()

  return (
    <AuthWrapper>
      <InterviewLayout currPage="interview">
        <Container className={classes.root} disableGutters maxWidth="xl">
          <Grid container className={classes.gridWrapper}>
            <Grid item xs={9} className={classes.gridLeft}>
              <Box className={classes.codeWrapper}>Code Here</Box>
              <Box
                className={classes.questionWrapper}
                border={2}
                borderColor="black"
              >
                <AlgorithmQuestion />
              </Box>
            </Grid>
            <Grid item xs={3} className={classes.gridRight}>
              <Box className={classes.videoWrapper}>Video Here</Box>
              <Box className={classes.chatWrapper}>Chat here</Box>
            </Grid>
          </Grid>
        </Container>
      </InterviewLayout>
    </AuthWrapper>
  )
}

export default Interview
