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
    <Card className="max-w-sm">
        <div className="mb-2 block">
        <h1>Register</h1>
        </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div 
            className="mb-2 block">
            <Label htmlFor="text" value="Name" />
          <TextInput id="name" type="text" required />
          </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput id="email" type="email" placeholder="email" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput id="password" type="password" required />
        </div>
        <div className="flex items-center gap-2">
        </div>
        <Button type="submit">Submit</Button>
      </form>

      <a href="" onClick={handleLoginClick}>Login</a>
    </Card>
    </div>
  );
}
    


export default Register