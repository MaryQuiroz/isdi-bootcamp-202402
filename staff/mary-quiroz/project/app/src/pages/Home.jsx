import { AddButton } from '../components/AddButton'
import { CardList } from '../components/CardList'
import { NavbarComponent } from '../components/Navbar'
import { ModalComponent } from '../components/Modal'
import { useContext, useEffect, useState } from 'react'
import { AddCatForm } from '../components/AddCatForm'
import { AppContext } from '../context/AppContext'
import { InfoCatComponent } from '../components/InfoCat'
import retrieveCats from '../logic/retrieveCats'
import SearchCatComponent from '../components/SearchCat'

const Home = () => {
  const { cats, setCats} = useContext(AppContext)
  const [showModal, setShowModal] = useState(false)
  

useEffect(() => {
  retrieveCats()
  .then(cats=>setCats(cats))
  .catch(error=>console.log(error))


}, [])

  const renderCatCard = (cat, index) => (
    <InfoCatComponent key={index} cat={cat} />
  )

  
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarComponent />
      <div className="">
      <AddButton text="Add Cat" onClick={() => setShowModal(true)} />
      <SearchCatComponent/>
      <ModalComponent
      title="Add Cat"
        show={showModal}
        onClose={() => setShowModal(false)}
        form={
          <AddCatForm setShowModal={setShowModal} />
        }
      />
      {cats.length === 0 ? (
          <h3 className='text-center'>No cats found</h3>
        ) : (
          <CardList data={cats} renderCard={renderCatCard} />
        )}
      </div>
    </div>
  )
}

export default Home