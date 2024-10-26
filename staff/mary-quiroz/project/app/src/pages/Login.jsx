import { logger } from '../utils'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import logic from "../logic"
import { Button, Card, Label, TextInput } from "flowbite-react"
import { useState, useRef } from 'react'
import { ToastComponent } from '../components/Toast'
import logo from '../assets/logo.svg'
import logoDark from '../assets/logo-dark.svg'

export default function Login({ onUserLoggedIn, onRegisterClick }) {
  const { showFeedback } = useContext(AppContext)
  const [error, setError] = useState()
  const [showPassword, setShowPassword] = useState(false)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const { darkMode } = useContext(AppContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target

    const email = emailRef.current.value
    const password = passwordRef.current.value

    try {
      await logic.loginUser(email, password)
      form.reset()
      onUserLoggedIn()
    } catch (error) {
      setError(error.message)
      showFeedback(error.message, 'error')
    }
  }

  const handleRegisterClick = (event) => {
    event.preventDefault()
    onRegisterClick()
  }

  logger.debug('Login -> render')
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 mb-4 relative flex items-center justify-center">
            <img 
              src={darkMode ? logoDark : logo}
              className="w-16 h-16 text-black dark:text-white transition-transform duration-200 hover:scale-105" 
              alt="MyCat Logo" 
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bienvenido a MyCat</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Inicia sesión para continuar</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Correo electrónico" className="text-gray-700 dark:text-gray-300" />
            </div>
            <TextInput
              ref={emailRef}
              id="email"
              type="email"
              placeholder="tu@email.com"
              required
              className="dark:bg-gray-700"
            />
          </div>
          
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Contraseña" className="text-gray-700 dark:text-gray-300" />
            </div>
            <div className="flex items-center">
              <TextInput
                ref={passwordRef}
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                className="flex-1 dark:bg-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 p-2.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                {showPassword ? '👁️' : '🔒'}
              </button>
            </div>
          </div>

          <Button 
            type="submit"
            className="mt-4"
          >
            Iniciar sesión
          </Button>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">¿No tienes cuenta? </span>
            <a 
              href="#" 
              onClick={handleRegisterClick}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Regístrate aquí
            </a>
          </div>
        </form>
        
        {error && <ToastComponent title={error} />}
      </Card>
    </div>
  );
}
