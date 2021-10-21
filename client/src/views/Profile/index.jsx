import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Rating from '@material-ui/lab/Rating'
import {
  Avatar,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core'
import HomeLayout from '../../components/Layout/HomeLayout'
import AuthWrapper from '../../components/Authentication/AuthWrapper'
import { useRouter } from 'next/router'
import { fetchStorage } from '../../storage'
import { getFeedbacks } from '../../api/feedback'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  gridWrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    height: 172,
    width: 172,
    marginBottom: 16,
  },
  registrationText: {
    marginTop: 8,
    marginBottom: 8,
  },
  reviewWrapper: {
    height: '80%',
    backgroundColor: theme.palette.background.secondary,
    borderRadius: theme.shape.borderRadius,
    padding: 16,
    overflow: 'scroll',
  },
  reviewHeader: {
    fontWeight: 700,
  },
  reviewItem: {
    background: theme.palette.background.main,
    marginBottom: 8,
    borderRadius: theme.shape.borderRadius,
  },
}))

const convertTimestamp = (timestamp) => {
  return new Date(timestamp?.replace(' ', 'T')).toLocaleString()
}

const Review = (props) => {
  Review.propTypes = {
    feedback: PropTypes.object.isRequired,
  }

  const classes = useStyles()
  const { feedback } = props

  return (
    <ListItem className={classes.reviewItem}>
      <ListItemIcon>
        <Avatar
          alt={`${feedback.firstname}`}
          src={`https://avatars.dicebear.com/api/initials/${feedback.firstname} ${feedback.lastname}.svg`}
        />
      </ListItemIcon>
      <ListItemText
        primary={`${feedback.firstname} ${feedback.lastname}`}
        secondary={`[Session #${feedback.isessionid}] ${feedback.comment}`}
      />
    </ListItem>
  )
}

const Profile = () => {
  const classes = useStyles()
  const router = useRouter()
  const user = fetchStorage('user')
  const [loading, setLoading] = useState(true)
  const [feedbacks, setFeedbacks] = useState()

  useEffect(() => {
    getFeedbacks(user.userid)
      .then((res) => {
        setFeedbacks(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (user && feedbacks) {
      setLoading(false)
    }
  }, [user, feedbacks])

  const handleRedirectReset = (e) => {
    e.preventDefault()
    router.push('/resetPassword')
  }

  return (
    <AuthWrapper>
      {!loading && (
        <HomeLayout currPage="Profile">
          <Container className={classes.root} maxWidth="lg">
            <Grid container className={classes.gridWrapper}>
              <Grid item xs={4} className={classes.profileWrapper}>
                <Avatar
                  className={classes.avatar}
                  alt={`${user?.firstname}`}
                  src={`https://avatars.dicebear.com/api/initials/${user?.firstname} ${user?.lastname}.svg`}
                />
                <Typography variant="h6">{`${user?.firstname} ${user?.lastname}`}</Typography>
                <Typography variant="subtitle1">{user?.email}</Typography>
                <Rating name="disabled" value={4} disabled />
                <Typography
                  variant="caption"
                  className={classes.registrationText}
                >
                  {`Joined On: ${convertTimestamp(user?.createdat)}`}
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleRedirectReset}
                >
                  Reset Password
                </Button>
              </Grid>
              <Grid item xs={8} className={classes.reviewWrapper}>
                <Typography
                  variant="subtitle2"
                  className={classes.reviewHeader}
                >
                  Reviews
                </Typography>
                <List>
                  {feedbacks.length === 0 && (
                    <Typography align="center">
                      No Interviews Participated
                    </Typography>
                  )}
                  {feedbacks.map((feedback) => (
                    <Review key={feedback.feedbackid} feedback={feedback} />
                  ))}
                </List>
              </Grid>
            </Grid>
          </Container>
        </HomeLayout>
      )}
    </AuthWrapper>
  )
}

export default Profile
