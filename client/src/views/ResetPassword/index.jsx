import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import AuthLayout from '../../components/Layout/AuthLayout'
import { useRouter } from 'next/router'
import firebase from '../../config/firebase'
import toast, { Toaster } from 'react-hot-toast'
import { ERROR, SUCCESS } from '../../utils/message'

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    backgroundColor: theme.palette.background.default,
    padding: '80px 56px',
    opacity: 0.9,
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    width: 400,
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
    justifyContent: 'center',
  },
  link: {
    cursor: 'pointer',
  },
}))

const ResetPassword = () => {
  const classes = useStyles()
  const router = useRouter()
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
    },
  })
  const onSubmit = (data) => {
    console.log(data)
    const { email } = data
    if (email) {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => toast.success(SUCCESS.reset))
        .catch((error) => {
          toast.error(error.message)
        })
    } else {
      toast.error(ERROR.incompleteFields)
    }
  }

  const handleRedirectLogin = (e) => {
    e.preventDefault()
    router.push('/')
  }

  return (
    <AuthLayout>
      <Toaster position="top-right" />
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submitBtn}
            onClick={handleSubmit(onSubmit)}
          >
            Send Recovery Link
          </Button>
          <Box className={classes.linkWrapper}>
            <Typography
              color="primary"
              variant="body2"
              className={classes.link}
              onClick={handleRedirectLogin}
            >
              Back to Login
            </Typography>
          </Box>
        </form>
      </Box>
    </AuthLayout>
  )
}

export default ResetPassword
