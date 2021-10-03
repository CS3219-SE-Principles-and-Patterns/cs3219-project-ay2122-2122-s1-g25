import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import firebase from '../../config/firebase'
import AuthLayout from '../Layout/AuthLayout'
import { useRouter } from 'next/router'

const Unauthenticated = () => {
  const router = useRouter()

  return (
    <AuthLayout>
      <div style={{ textAlign: 'center' }}>
        <h1>401 - You are not authenticated</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/')}
        >
          Login
        </Button>
      </div>
    </AuthLayout>
  )
}

const AuthWrapper = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { children } = props

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setIsLoading(false)
    })
  }, [])

  return !isLoading && <>{isLoggedIn ? children : <Unauthenticated />}</>
}

AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthWrapper
