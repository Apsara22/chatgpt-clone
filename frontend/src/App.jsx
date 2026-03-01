import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Chatgpt } from './pages/Chatgpt'

const App = () => {
  const [showHome, setShowHome] = useState(true)
  const fullText = 'Welcome to ChatGpt'

  useEffect(() => {
    // Calculate time to show all text (text length * 150ms + small buffer)
    const timer = setTimeout(() => {
      setShowHome(false)
    }, fullText.length * 150 + 500) // 500ms buffer after last letter

    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={showHome ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chatgpt />} />
      </Routes>
    </Router>
  )
}

export default App