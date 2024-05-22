import { Dropdown, Navbar } from "flowbite-react"
import { useEffect, useState } from "react"
import retrieveUser from "../logic/retrieveUser"
import  {useNavigate} from "react-router-dom"
import logic from "../logic"


export const NavbarComponent=() =>{
  const [user, setUser] = useState([])
  const navigate = useNavigate()
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
      <Navbar.Brand href="#" onClick={()=>navigate("/")}>
        <img src="/favicon.png" className="mr-3 h-6 sm:h-9" alt="Cat" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white" >MyCat</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={true}
          inline
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