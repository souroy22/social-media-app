import React from 'react'
import { Routes } from 'react-router-dom'

const app = () => {
  console.log(process.env.ENVIRONMENT)
  return (
    <div>
      <Routes></Routes>
    </div>
  )
}

export default app
