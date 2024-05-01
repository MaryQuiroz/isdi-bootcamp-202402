import { AddButton } from '../components/AddButton'
import { CardList } from '../components/CardList'
import { NavbarComponent } from '../components/Navbar'
import { ModalComponent } from '../components/ModalComponent'
import { useContext, useEffect } from 'react'
import { AddCatForm } from '../components/AddCatForm'
import { AppContext } from '../context/AppContext'
import { InfoCatComponent } from '../components/InfoCat'
import retrieveCats from '../logic/retrieveCats'

const Home = () => {
  const { cats, changeStateModal, stateModal, addCats } = useContext(AppContext)

useEffect(() => {
  retrieveCats()
  .then(cats=>addCats(cats))
  .catch(error=>console.log(error))


}, [])

  const renderCatCard = (cat, index) => (
    <InfoCatComponent key={index} cat={cat} />
  )

  
  return (
    <>
      <NavbarComponent />
      <AddButton text="Add Cat" onClick={() => changeStateModal(true)} />
      <ModalComponent
      title="Add Cat"
        show={stateModal}
        onClose={() => changeStateModal(false)}
        form={
          <AddCatForm />
        }
      />

      <CardList data={cats} renderCard={renderCatCard} />


    </>
  )
}


export default Home