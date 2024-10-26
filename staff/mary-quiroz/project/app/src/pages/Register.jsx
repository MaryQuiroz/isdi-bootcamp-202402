import { logger } from '../utils'
import logic from '../logic'
import { Button, Card, Label, TextInput } from "flowbite-react"
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
import logo from '../assets/logo.svg'
import logoDark from '../assets/logo-dark.svg'


function Register({ onUserRegistered, onLoginClick }) {
    const { showFeedback } = useContext(AppContext)
    const { darkMode } = useContext(AppContext)

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
                .catch(error => showFeedback(error.message, 'error'))
        } catch (error) {
            showFeedback(error.message, 'error')
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()
        onLoginClick()
    }

    logger.debug('Register -> render')

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
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create account</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Register to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <Label 
                            htmlFor="name" 
                            value="Full Name" 
                            className="text-gray-700 dark:text-gray-300"
                        />
                        <TextInput
                            id="name"
                            type="text"
                            required
                            placeholder="Your Name"
                            className="dark:bg-gray-700"
                        />
                    </div>

                    <div>
                        <Label 
                            htmlFor="email" 
                            value="Email" 
                            className="text-gray-700 dark:text-gray-300"
                        />
                        <TextInput
                            id="email"
                            type="email"
                            required
                            placeholder="your@email.com"
                            className="dark:bg-gray-700"
                        />
                    </div>

                    <div>
                        <Label 
                            htmlFor="password" 
                            value="Password" 
                            className="text-gray-700 dark:text-gray-300"
                        />
                        <TextInput
                            id="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="dark:bg-gray-700"
                        />
                    </div>

                    <Button 
                        type="submit"
                        className="mt-4"
                    >
                        Create count
                    </Button>

                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">¿Ya tienes cuenta? </span>
                        <a 
                            href="#" 
                            onClick={handleLoginClick}
                            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Log in here
                        </a>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default Register
