import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import firebase from '../../config/firebase'

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

  return (
    !isLoading && (
      <>{isLoggedIn ? children : <h1>401 - You are not authenticated</h1>}</>
    )
  )
}

AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthWrapper
