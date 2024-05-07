import React, { useContext, useEffect, useState } from 'react'
import { NavbarComponent } from '../components/Navbar'
import { FooterComponent } from '../components/Footer'
import { useParams } from 'react-router-dom'
import retrieveTasks from '../logic/retrieveTasks'
import { TaskList } from '../components/TaskList'
import { ModalComponent } from '../components/Modal'
import { AddTaskForm } from '../components/AddTaskForm'
import { AppContext } from '../context/AppContext'
import { Task } from '../components/Task'
import { CardList } from '../components/CardList'
import { AddButton } from '../components/AddButton'


const Tasks = () => {
  const { tasks, setTasks } = useContext(AppContext)

  const [showAddTaskModal, setAddTaskModal] = useState(false)

  const { catId } = useParams()

  useEffect(() => {
    retrieveTasks(catId).then(setTasks)
  }, [])

  const onAddTaskHandler = () => {
    setAddTaskModal(true)

  }

  const renderCatCard = (task, index) => (
    <Task key={index} task={task} />
  )

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
      {/* <
              href="#"
              className="max-w-full inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              onClick={onAddTaskHandler}
            >

              Add Task
            </a> */}

            <AddButton text="Add Cat" onClick={() => setAddTaskModal(true)} />
       <CardList data={tasks} renderCard={renderCatCard} />
      </div>
     
      <FooterComponent />
    </>)
}

export default Tasks