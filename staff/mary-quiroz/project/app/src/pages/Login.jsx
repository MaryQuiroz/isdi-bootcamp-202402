import { logger } from '../utils'


import { useContext } from '../context'
import logic from "../logic"

import { Button, Card, Label, TextInput } from "flowbite-react"
import { useState, useRef } from 'react'

export default function Login({ onUserLoggedIn, onRegisterClick }) {
  const { showFeedback } = useContext()
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput  ref={emailRef} id="email" type="email" placeholder="email" required />
          </div>
          <div className="flex items-center">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <div className="flex items-center">
                <TextInput ref={passwordRef}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="*****"
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
          <Button type="submit">Submit</Button>
        </form>
        <a href="" onClick={handleRegisterClick}>Register</a>
      </Card>
    </div>
  );
}

