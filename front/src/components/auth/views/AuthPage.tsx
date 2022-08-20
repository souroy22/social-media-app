import React, { useState } from 'react'
import '../styles/authStyles.css'
import LeftPanel from './LeftPanel'
import LoginForm from './LoginForm'
import RightPanel from './RightPanel'
import SignupForm from './SignupForm'

const AuthPage: React.FC = () => {
  const [signupClass, setSignupClass] = useState<string>('')

  return (
    <div className={`container ${signupClass}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <LoginForm />
          <SignupForm />
        </div>
      </div>

      <div className="panels-container">
        <LeftPanel setSignupClass={setSignupClass} />
        <RightPanel setSignupClass={setSignupClass} />
      </div>
    </div>
  )
}

export default AuthPage
