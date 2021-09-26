import React from 'react'
import AuthWrapper from '../components/Authentication/AuthWrapper'
import firebase from '../config/firebase'
import { useRouter } from 'next/router'

const createToken = async () => {
  const user = firebase.auth().currentUser
  const token = user && (await user.getIdToken())
  console.log(user.uid)
  console.log(user.email)
  console.log(token)
  return token
}

const LoggedIn = () => {
  const router = useRouter()

  const handleSignOut = (e) => {
    firebase.auth().signOut()
    e.preventDefault()
    router.push('/')
  }

  return (
    <AuthWrapper>
      <div>
        <h3>Congratulations, you are logged in!</h3>
        <button onClick={handleSignOut}>Sign Out</button>
        <button onClick={createToken}>Get JWT</button>
      </div>
    </AuthWrapper>
  )
}

export default LoggedIn
