import React, { useContext, useEffect, useState } from 'react'
import { NavbarComponent } from '../components/Navbar'
import { FooterComponent } from '../components/Footer'
import { useParams } from 'react-router-dom'
import retrieveTasks from '../logic/retrieveTasks'
import { ModalComponent } from '../components/Modal'
import { AddTaskForm } from '../components/AddTaskForm'
import { AppContext } from '../context/AppContext'
import { AddButton } from '../components/AddButton'
import { TabsComponent } from '../components/Tabs'


const Tasks = () => {
  const { tasks, setTasks } = useContext(AppContext)

  const [showAddTaskModal, setAddTaskModal] = useState(false)

  const { catId } = useParams()

  useEffect(() => {
    retrieveTasks(catId).then(setTasks)
  }, [])

  return (
    <>
    
    <ModalComponent
        title="Add Task"
        show={showAddTaskModal}
        onClose={() => setAddTaskModal(false)}
        form={
          <AddTaskForm setShowModal={setAddTaskModal} catId={catId} />
        }
      />
      <NavbarComponent />
      <div className='max-w-full mt-16   lg:mt-6 md:max-w-sm mx-auto flex-grow'>
           
            <AddButton text="Add Task" onClick={() => setAddTaskModal(true)} />
            <TabsComponent/>
      </div>
     
      <FooterComponent />
    </>)
}

export default Tasks