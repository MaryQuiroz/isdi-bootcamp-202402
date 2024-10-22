import { logger } from './utils'
import logic from './logic'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Feedback from './components/Feedback'
import { useState, useContext } from 'react'
import { AppContext, AppProvider } from './context/AppContext'
import Confirm from './components/Confirm'
import { errors } from 'com'
import Tasks from './pages/Tasks'

const { UnauthorizedError } = errors

function AppContent() {
  const { showFeedback, feedback, setFeedback } = useContext(AppContext)
  const [confirm, setConfirm] = useState(null)

  const navigate = useNavigate()

  const goToLogin = () => navigate('/login')

  const handleLoginClick = () => goToLogin()

  const handleRegisterClick = () => navigate('/register')

  const handleUserLoggedIn = () => navigate('/')

  const handleUserLoggedOut = () => goToLogin()

  const handleFeedbackAcceptClick = () => setFeedback(null)

  const handleFeedback = (error, level = 'warn') => {
    if (error instanceof UnauthorizedError) {
      logic.logoutUser()
      level = 'error'
      goToLogin()
    }
    showFeedback(error.message, level)
  }

  const handleConfirm = (message, callback) => setConfirm({ message, callback })

  const handleConfirmCancelClick = () => {
    confirm.callback(false)
    setConfirm(null)
  }

  const handleConfirmAcceptClick = () => {
    confirm.callback(true)
    setConfirm(null)
  }

  logger.debug('App -> render')

  return <>
    <Routes>
      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onRegisterClick={handleRegisterClick} onUserLoggedIn={handleUserLoggedIn} />} />
      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onUserRegistered={handleLoginClick} />} />
      <Route path="/tasks/:catId" element={logic.isUserLoggedIn() ? <Tasks/> : <Register onLoginClick={handleLoginClick} onUserRegistered={handleLoginClick} />} />
      <Route path="/*" element={logic.isUserLoggedIn() ? <Home onUserLoggedOut={handleUserLoggedOut} /> : <Navigate to="/login" />} />
    </Routes>

    {feedback && <Feedback message={feedback.message} level={feedback.level} onAcceptClick={handleFeedbackAcceptClick} />}

    {confirm && <Confirm message="hola confirm" onCancelClick={handleConfirmCancelClick} onAcceptClick={handleConfirmAcceptClick} />}
  </>
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
