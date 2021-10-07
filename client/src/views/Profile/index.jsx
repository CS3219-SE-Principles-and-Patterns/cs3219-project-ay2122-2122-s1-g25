import React from 'react'
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

const Review = () => {
  const classes = useStyles()

  const peerData = {
    first_name: 'Jia Hua',
    last_name: 'Loh',
    username: 'jiahua',
    email: 'jiahua@u.nus.edu',
  }

  return (
    <ListItem className={classes.reviewItem}>
      <ListItemIcon>
        <Avatar
          alt={`${peerData.username}`}
          src={`https://avatars.dicebear.com/api/initials/${peerData.first_name} ${peerData.last_name}.svg`}
        />
      </ListItemIcon>
      <ListItemText
        primary={`@${peerData.username}`}
        secondary="An amazing programmer! Thanks for practicing with me!"
      />
    </ListItem>
  )
}

const Profile = () => {
  const classes = useStyles()
  const router = useRouter()
  const user = fetchStorage('user')

  const convertTimestamp = (timestamp) => {
    return new Date(timestamp?.replace(' ', 'T')).toLocaleString()
  }

  const handleRedirectReset = (e) => {
    e.preventDefault()
    router.push('/resetPassword')
  }

  return (
    <AuthWrapper>
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
              <Typography variant="subtitle2" className={classes.reviewHeader}>
                Reviews
              </Typography>
              <List>
                <Review />
                <Review />
                <Review />
                <Review />
                <Review />
                <Review />
                <Review />
                <Review />
                <Review />
                <Review />
              </List>
            </Grid>
          </Grid>
        </Container>
      </HomeLayout>
    </AuthWrapper>
  )
}

export default Profile
