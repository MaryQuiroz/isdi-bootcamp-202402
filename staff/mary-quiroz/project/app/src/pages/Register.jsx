import { logger } from '../utils'

import logic from '../logic'

import { useContext } from '../context'

import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";

function Register({ onUserRegistered, onLoginClick }) {
    const { showFeedback } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const email = form.email.value
        const password = form.password.value

        try {
            logic.registerUser(name, email, password)
                .then(() => {
                    form.reset()

                    onUserRegistered()
                })
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }

    logger.debug('Register -> render')


  return (
    <div className="flex justify-center items-center h-screen">
    <Card className="max-w-sm p-4">
      <div className="mb-2 block">
        <img src="/favicon.png" className="mx-auto h-12" alt="Cat" />
        <h1 className="text-2xl font-bold text-center">Register</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="mb-2 ">
          <Label htmlFor="name" value="Name" />
          <TextInput id="name" type="text" required className="block w-full p-2 text-sm text-gray-700 placeholder-gray-400" placeholder="Complete Name" />
        </div>
        <div className="mb-2">
          <Label htmlFor="email" value="Your email" />
          <TextInput id="email" type="email" placeholder="E-mail" required className="block w-full p-2  text-sm text-gray-700 placeholder-gray-400" />
        </div>
        <div className="mb-2">
          <Label htmlFor="password" value="Your password" />
          <TextInput id="password" type="password" placeholder="Password" className="block w-full p-2  text-sm text-gray-700 placeholder-gray-400" />
        </div>
        <div className="flex justify-center">
          <Button type="submit" >
            Submit
          </Button>
        </div>
      </form>
      <a href="#" onClick={handleLoginClick} className="text-sm text-gray-600 hover:text-gray-900 text-center">
        Already have an account? Login
      </a>
    </Card>
  </div>
  )
}
    


export default Register