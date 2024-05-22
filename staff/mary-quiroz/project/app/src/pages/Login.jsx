import { logger } from '../utils'


import { useContext } from '../context'
import logic from "../logic"

import {  Button, Card, Label, TextInput } from "flowbite-react"
import { useState, useRef } from 'react'
import { AlertComponent } from '../components/Alert'
import { ToastComponent } from '../components/Toast'

export default function Login({ onUserLoggedIn, onRegisterClick }) {
  const { showFeedback } = useContext()
  const [error, setError] = useState()
  const [showPassword, setShowPassword] = useState(false)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleSubmit = async () => {
    event.preventDefault()
    const form = event.target

    const email = emailRef.current.value
    const password = passwordRef.current.value

    logger.debug('Login -> handleSubmit', email, password)
    try {
      await logic.loginUser(email, password)

      form.reset()

      onUserLoggedIn()

    } catch (error) {
      setError(error.message)
      showFeedback(error)
    }
  }

  const handleRegisterClick = () => {
    event.preventDefault()

    onRegisterClick()
  }

  logger.debug('Login -> render')
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-sm">
      <div className="mb-2 block">
        <img src="/favicon.png" className="mx-auto h-12" alt="Cat" />
        <h1 className="text-2xl font-bold text-center">Login</h1>
      </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput  ref={emailRef} id="email" type="email" placeholder="email" required />
          </div>
          <div className="flex items-center">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <div className="flex items-center">
                <TextInput ref={passwordRef}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  className="flex-1"
                  
                />
                <a
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 px-2 py-1.5 text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
                >
                  {showPassword ? '👀' : '🥷'}
                </a>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
          <Button type="submit">Submit</Button>
          </div>
        </form>
        <a href="" onClick={handleRegisterClick}>Register</a>
      </Card>
      {error && <ToastComponent title={error} />}
    </div>
  );
}

