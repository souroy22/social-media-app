import React from 'react'
import LOG_IMAGE from '../img/register.svg'

interface RightPanelProps {
  setSignupClass: (mode: string) => void
}

const RightPanel: React.FC<RightPanelProps> = ({ setSignupClass }) => {
  return (
    <div className="panel right-panel">
      <div className="content">
        <h3>One of us ?</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          laboriosam ad deleniti.
        </p>
        <button
          className="btn transparent"
          onClick={() => setSignupClass('')}
          id="sign-in-btn"
        >
          Sign in
        </button>
      </div>
      <img src={LOG_IMAGE} className="image" alt="" />
    </div>
  )
}

export default RightPanel
