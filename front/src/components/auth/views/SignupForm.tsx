import React from 'react'
import { Google, Facebook } from '@mui/icons-material'

const SignupForm: React.FC = () => {
  return (
    <>
      <form action="#" className="sign-up-form">
        <h2 className="title">Sign up</h2>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Username" />
        </div>
        <div className="input-field">
          <i className="fas fa-envelope"></i>
          <input type="email" placeholder="Email" />
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password" />
        </div>
        <input type="submit" className="btn" value="Sign up" />
        <p className="social-text">Or Sign up with social platforms</p>
        <div className="social-media">
          <div className="social-icon">
            <Facebook />
          </div>
          <div className="social-icon">
            <Google />
          </div>
        </div>
      </form>
    </>
  )
}

export default SignupForm
