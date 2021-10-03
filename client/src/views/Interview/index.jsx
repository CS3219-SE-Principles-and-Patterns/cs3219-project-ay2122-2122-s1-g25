import React from 'react'
import AuthWrapper from '../../components/Authentication/AuthWrapper'
import InterviewLayout from '../../components/Layout/InterviewLayout'

const Interview = () => {
  return (
    <AuthWrapper>
      <InterviewLayout currPage="interview">Interview</InterviewLayout>
    </AuthWrapper>
  )
}

export default Interview
