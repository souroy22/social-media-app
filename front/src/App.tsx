import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthPage from './components/auth/views/AuthPage'
import Base from './components/base/views/Base'

const app = () => {
  console.log('process.env.ENVIRONMENT', process.env.ENVIRONMENT)
  return (
    <>
      <Routes>
        <Route path="/" element={<Base />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default app
