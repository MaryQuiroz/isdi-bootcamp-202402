import { AddButton } from '../components/AddButton'
import { CardList } from '../components/CardList'
import { NavbarComponent } from '../components/Navbar'
import { ModalComponent } from '../components/ModalComponent'
import { useContext, useEffect, useState } from 'react'
import { AddCatForm } from '../components/AddCatForm'
import { AppContext } from '../context/AppContext'
import { InfoCatComponent } from '../components/InfoCat'
import retrieveCats from '../logic/retrieveCats'

const Home = () => {
  const { cats,updateCats } = useContext(AppContext)
  const [showModal, setShowModal] = useState(false)

useEffect(() => {
  retrieveCats()
  .then(cats=>updateCats(cats))
  .catch(error=>console.log(error))


}, [])

  const renderCatCard = (cat, index) => (
    <InfoCatComponent key={index} cat={cat} />
  )

  
  return (
    <>
      <NavbarComponent />
      <AddButton text="Add Cat" onClick={() => setShowModal(true)} />
      <ModalComponent
      title="Add Cat"
        show={showModal}
        onClose={() => setShowModal(false)}
        form={
          <AddCatForm setShowModal={setShowModal} />
        }
      />

      <CardList data={cats} renderCard={renderCatCard} />


    </>
  )
}


export default Home