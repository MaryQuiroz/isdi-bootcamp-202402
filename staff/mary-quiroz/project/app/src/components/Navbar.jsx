import { Avatar, Dropdown, Navbar } from "flowbite-react"
import { useEffect, useState } from "react"
import retrieveUser from "../logic/retrieveUser"
import  {useNavigate} from "react-router-dom"
import logic from "../logic"


export const NavbarComponent=() =>{
  const navigate = useNavigate()
  const [user, setUser] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await retrieveUser()
        setUser(user)
      } catch (error) {
        console.error('Error al recuperar al usuario:', error);
      }
    }

    fetchData();
  }, [])

  const handleUserLoggedOut=()=>{
    logic.logoutUser()
    navigate("/")
  }

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="#">
        <img src="/favicon.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Pet&App</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user.name}</span>
            <span className="block truncate text-sm font-medium">{user.email}</span>
          </Dropdown.Header>
          <Dropdown.Item>Perfil</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleUserLoggedOut}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      {/* <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
         <Navbar.Link href="#">About</Navbar.Link> 
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}
