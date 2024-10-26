import React, { createContext, useState, useEffect } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [cats, setCats] = useState([])
  const [cat, setCat] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode =localStorage.getItem('darkMode')
    return savedDarkMode === 'true' || false
  })
  

  useEffect(() => {
    // Aplicar el modo oscuro al elemento HTML
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      setDarkMode(!darkMode)
    })
  }

  const resetDarkMode = () => {
    setDarkMode(false)
    localStorage.removeItem('darkmode')
  }

  const addCat = (newCat) => setCats([newCat, ...cats])

  const showFeedback = (message, level = 'info') => {
    setFeedback({ message, level })
    setTimeout(() => setFeedback(null), 3000) // Ocultar el feedback después de 3 segundos
  }

  

  return (
    <AppContext.Provider value={{ 
      tasks, 
      setTasks, 
      cats, 
      setCats, 
      setCat, 
      cat, 
      addCat, 
      showFeedback, 
      feedback,
      darkMode,
      toggleDarkMode,
    }}>
      {children}
    </AppContext.Provider>
  )
}
