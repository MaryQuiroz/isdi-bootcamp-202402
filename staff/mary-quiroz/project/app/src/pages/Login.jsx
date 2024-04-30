import { logger } from '../utils'

import logic from '../logic'

import { useContext } from '../context'

import { Button, Card, Label, TextInput } from "flowbite-react"

function Login({ onUserLoggedIn, onRegisterClick }) {
    const { showFeedback } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const email = form.email.value
        const password = form.password.value

         logger.debug('Login -> handleSubmit', email, password)

         try {
            logic.loginUser(email, password)
                .then(() => {
                    form.reset()

                    onUserLoggedIn()
               })
               .catch(error => showFeedback(error, 'error'))
         } catch (error) {
            showFeedback(error)
         }
    }

    const handleRegisterClick = event => {
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
          <TextInput id="email" type="email" placeholder="email" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password" type="password" placeholder="*****" required />
        </div>
        <Button type="submit">Submit</Button>
      </form>

      <a href="" onClick={handleRegisterClick}>Register</a>
    </Card>
    </div>
  );
}

export default Login