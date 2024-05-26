import { Avatar, Dropdown, Navbar } from "flowbite-react"
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

  const generateImage = (min, max) => {
    const number =  Math.floor(Math.random() * (max - min) + min)
    const image = `https://flowbite.com/docs/images/people/profile-picture-${number}.jpg`

    return image
  }
 

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
          label={
            <Avatar alt="User settings" img= {generateImage(1,5)} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user.name}</span>
            <span className="block truncate text-sm font-medium">{user.email}</span>
          </Dropdown.Header>
          <Dropdown.Item onClick={handleUserLoggedOut}>Sign out</Dropdown.Item>
        </Dropdown>
        
      </div>
    </Navbar>
  );
}
