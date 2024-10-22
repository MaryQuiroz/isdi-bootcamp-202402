import { logger, Logger } from './utils'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppProvider } from './context/AppContext'

logger.level = Logger.DEBUG

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Router>
    <AppProvider>
      <App />
    </AppProvider>
  </Router>
  // </React.StrictMode>,
)
