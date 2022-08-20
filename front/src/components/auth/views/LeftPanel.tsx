import React from 'react'
import REGISTER_IMAGE from '../img/log.svg'

interface LeftPanelProps {
  setSignupClass: (mode: string) => void
}

const LeftPanel: React.FC<LeftPanelProps> = ({ setSignupClass }) => {
  return (
    <div className="panel left-panel">
      <div className="content">
        <h3>New here ?</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex
          ratione. Aliquid!
        </p>
        <button
          className="btn transparent"
          onClick={() => setSignupClass('sign-up-mode')}
          id="sign-up-btn"
        >
          Sign up
        </button>
      </div>
      <img src={REGISTER_IMAGE} className="image" alt="" />
    </div>
  )
}

export default LeftPanel
