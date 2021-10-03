import React from 'react'
import AuthWrapper from '../../components/Authentication/AuthWrapper'
import InterviewLayout from '../../components/Layout/InterviewLayout'

const Feedback = () => {
  return (
    <AuthWrapper>
      <InterviewLayout currPage="feedback">Feedback</InterviewLayout>
    </AuthWrapper>
  )
}

export default Feedback
