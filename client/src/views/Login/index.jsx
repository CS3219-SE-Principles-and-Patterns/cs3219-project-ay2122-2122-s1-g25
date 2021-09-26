import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import AuthLayout from '../../components/Layout/AuthLayout'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    backgroundColor: theme.palette.background.default,
    padding: '80px 56px',
    opacity: 0.9,
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    width: 500,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  submitBtn: {
    marginTop: 24,
  },
  linkWrapper: {
    marginTop: 8,
    display: 'flex',
    justifyContent: 'space-between',
  },
  link: {
    cursor: 'pointer',
  },
}))

const Login = () => {
  const classes = useStyles()
  const router = useRouter()
  const { handleSubmit, control } = useForm()
  const onSubmit = (data) => {
    console.log(data)
  }

  const handleRedirectRegister = (e) => {
    e.preventDefault()
    router.push('/register')
  }

  const handleRedirectReset = (e) => {
    e.preventDefault()
    router.push('/resetPassword')
  }

  return (
    <AuthLayout>
      <Box className={classes.cardWrapper}>
        <img src={'/Upskill-Logo-Black.png'} />
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Controller
            name={'email'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                variant="outlined"
                margin="normal"
                onChange={onChange}
                value={value}
                label={'Email'}
              />
            )}
          />
          <Controller
            name={'password'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                variant="outlined"
                margin="normal"
                onChange={onChange}
                value={value}
                label={'Password'}
              />
            )}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.submitBtn}
            onClick={handleSubmit(onSubmit)}
          >
            Sign In
          </Button>
          <Box className={classes.linkWrapper}>
            <Typography
              color="primary"
              variant="body2"
              className={classes.link}
              onClick={handleRedirectRegister}
            >
              Register
            </Typography>
            <Typography
              color="primary"
              variant="body2"
              className={classes.link}
              onClick={handleRedirectReset}
            >
              Forgot Password?
            </Typography>
          </Box>
        </form>
      </Box>
    </AuthLayout>
  )
}

export default Login
