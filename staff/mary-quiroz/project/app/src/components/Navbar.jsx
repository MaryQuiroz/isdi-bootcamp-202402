import { Avatar, Dropdown, Navbar } from "flowbite-react"
import { useEffect, useState, useContext } from "react"
import retrieveUser from "../logic/retrieveUser"
import { useNavigate } from "react-router-dom"
import logic from "../logic"
import { AppContext } from "../context/AppContext"
import logo from '../assets/logo.svg'
import logoDark from '../assets/logo-dark.svg'

export const NavbarComponent = () => {
  const [user, setUser] = useState([])
  const [avatarImage, setAvatarImage] = useState('')
  const navigate = useNavigate()
  const { darkMode, toggleDarkMode } = useContext(AppContext)

  useEffect(() => {
    const fetchData = () => {
      retrieveUser()
        .then(user => {
          setUser(user)
          setAvatarImage(generateImage(1, 5))
        })
        .catch(error => {
          showFeedback(error, 'error')
        })
    }

    fetchData()
  }, [])

  const generateImage = (min, max) => {
    const number = Math.floor(Math.random() * (max - min) + min)
    return `https://flowbite.com/docs/images/people/profile-picture-${number}.jpg`
  }

  const handleUserLoggedOut = () => {
    logic.logoutUser()
    navigate("/")
  }

  return (
    <Navbar fluid className="bg-white border-b dark:border-gray-700 dark:bg-gray-900 px-4">
      <Navbar.Brand href="#" onClick={() => navigate("/")} className="flex items-center space-x-3">
        <div className="w-10 h-10 flex items-center justify-center">
          <img 
            src={darkMode ? logoDark : logo}
            className="w-8 h-8 transition-transform duration-200 hover:scale-110" 
            alt="MyCat Logo" 
          />
        </div>
        <span className="self-center text-xl font-semibold text-gray-900 dark:text-white">
          MyCat
        </span>
      </Navbar.Brand>
      
      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
          aria-label="Cambiar tema"
        >
          {darkMode ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
        
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={avatarImage} rounded size="sm" />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm font-medium text-gray-900 dark:text-white">
              {user.name}
            </span>
            <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item onClick={handleUserLoggedOut} className="text-sm text-gray-700 dark:text-gray-200">
          Log out
          </Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
}
