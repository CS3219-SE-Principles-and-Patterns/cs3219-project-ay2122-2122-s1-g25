export const ERROR = {
  incompleteFields: 'Fields are incomplete.',
  missingDifficulty: 'Select a difficulty before finding a Partner.',
  userCreationFailure:
    'Error saving user data, please contact administrator immediately.',
  userLoginFailure:
    'Error retrieving user data, please contact administrator immediately.',
  userMatchingCancelFailure:
    'Something went wrong when cancelling match, please contact administrator immediately.',
  interviewInitialisationFailure:
    'Failed to initialise interview session, please contact administrator immediately.',
  interviewFetchFailure:
    'Failed to fetch interview session. Please check if session is valid.',
  rotationFailure: 'Rotation failed.',
  rotationCompleted: 'Rotation of roles can only happen once.',
  feedbackFailure: 'Failed to submit feedback.',
  partnerFetchFailure: 'Failed to retrieve interview partner data.',
  interviewInvalidAlert: 'Interview session does not exist.',
  interviewCloseFailure: 'Failed to close interview session.',
  interviewClosedAlert: 'Not permitted to enter a completed interview session.',
  invalidInterviewUserAlert:
    "Not permitted to enter others' interview session.",
  invalidEmail: 'Please register using an NUS email address.',
  weakPassword:
    'Passwords must be longer than 8 characters and include alphabets, numbers, and special characters.',
  userNotFound: 'Current user cannot be retrieved.',
  userDataRetrivalFailure:
    'Unable to retrieve partner data, please contact administrator immediately.',
}

export const SUCCESS = {
  login: 'Successfully logged in.',
  register: 'User successfully created.',
  logout: 'Successfully logged out.',
  reset: 'Email successfully sent.',
  rotation: 'Roles rotated.',
  feedback: 'Feedback successfully submitted.',
}
