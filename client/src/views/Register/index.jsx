import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import AuthLayout from '../../components/Layout/AuthLayout'
import { useRouter } from 'next/router'
import firebase from '../../config/firebase'
import toast, { Toaster } from 'react-hot-toast'
import { ERROR, SUCCESS } from '../../utils/message'
import { createUser } from '../../api/users'
import { saveStorage } from '../../storage'

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    maxHeight: '80%',
    backgroundColor: theme.palette.background.default,
    padding: '80px 56px',
    opacity: 0.9,
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    width: 400,
    // overflow: 'scroll',
    overflow: 'auto',
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

const Register = () => {
  const classes = useStyles()
  const router = useRouter()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        router.push('/home')
      }
    })
  }, [])

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
  })
  const onSubmit = (data) => {
    const { email, password, firstName, lastName } = data
    const isEmailValid = isNusEmail(email)
    const isPasswordStrong = isStrongPassword(password)
    if (
      email &&
      password &&
      firstName &&
      lastName &&
      isEmailValid &&
      isPasswordStrong
    ) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const newUser = {
            userId: res.user.uid,
            email: email,
            firstName: firstName,
            lastName: lastName,
          }
          createUser(newUser)
            .then((apiRes) => {
              const user = apiRes.data[0]
              saveStorage('user', user)
              router.push('/')
              toast.success(SUCCESS.register)
            })
            .catch(() => {
              // TODO: implement a more effective error handler, possibly let outer promise catch it
              toast.error(ERROR.userCreationFailure, {
                duration: 15000,
              })
            })
        })
        .catch((error) => {
          toast.error(error.message)
        })
    } else if (email && !isEmailValid) {
      // email provided but is not NUS email
      toast.error(ERROR.invalidEmail)
    } else if (password && !isPasswordStrong) {
      // password provided but is not strong enough
      toast.error(ERROR.weakPassword)
    } else {
      toast.error(ERROR.incompleteFields)
    }
  }

  function isNusEmail(email) {
    const emailDomain = email.split('@')[1]
    return emailDomain === 'u.nus.edu'
  }

  function isStrongPassword(password) {
    const isLong = password.length > 8
    let hasSpecialChar = false
    let hasAlphabet = false
    let hasNumber = false
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= '0' && password[i] <= '9') {
        hasNumber = true
      }
    }
    let alphabetRegExp = /[a-zA-Z]/g
    if (alphabetRegExp.test(password)) {
      hasAlphabet = true
    }
    let specialCharRegExp = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/g
    if (specialCharRegExp.test(password)) {
      hasSpecialChar = true
    }
    return isLong && hasSpecialChar && hasAlphabet && hasNumber
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
          <Controller
            name={'firstName'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                variant="outlined"
                margin="normal"
                onChange={onChange}
                value={value}
                label={'Firstname'}
              />
            )}
          />
          <Controller
            name={'lastName'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                variant="outlined"
                margin="normal"
                onChange={onChange}
                value={value}
                label={'Lastname'}
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
                type="password"
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
            Register
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

export default Register
