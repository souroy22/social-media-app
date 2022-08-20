import React from 'react'
import { Google, Facebook } from '@mui/icons-material'

const LoginForm: React.FC = () => {
  return (
    <>
      <form action="#" className="sign-in-form">
        <h2 className="title">Sign in</h2>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Username" />
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password" />
        </div>
        <input type="submit" value="Login" className="btn solid" />
        <p className="social-text">Or Sign in with social platforms</p>
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

export default LoginForm
