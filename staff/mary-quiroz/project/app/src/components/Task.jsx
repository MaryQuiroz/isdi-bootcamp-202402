import {  Checkbox } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { BadgeComponent } from './Badge'
import { AppContext } from '../context/AppContext'
import { ModalComponent } from "./Modal"
import { formatDate } from '../utils/formatDate'
import updateTask from '../logic/updateTask'
import  Confirm  from "./Confirm"
import deleteTask from '../logic/deleteTask'
import { InfoTask } from './InfoTask'
import retrieveTasks from '../logic/retrieveTasks'
import Feedback from './Feedback'
import RoundButton from './library/RoundButton'

export const Task = ({task}) => {
  const { tasks, setTasks } = useContext(AppContext)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showInfoTaskModal, setShowInfoTaskModal] = useState(false)
  const [feedbackState, setFeedbackState] = useState({message: '', level: '', visible: false})

  
  const onUpdateHandler = async (event, taskId) => {
    const completed = event.target.checked; // Obtener el estado de la casilla de verificación
  
    try {
      // Actualizar la tarea en el servidor
      await updateTask(taskId, { completed })
  
      // Obtener todas las tareas actualizadas después de la actualización
      const allTasks = await retrieveTasks(task.cat.id || task.cat)
  
      // Actualizar el estado global de tareas con las tareas obtenidas
      setTasks(allTasks)
      setFeedbackState({ message: 'Task updated successfully!', level: 'success', visible: true })
    } catch (error) {
      console.error('Error updating the task:', error)
      setFeedbackState({message:'Error updating the task', level: 'ERROR', visible: 'true'})
    }
  }

  const onDeleteHandler = async () => {
    try {
      const deletedTaskId = await deleteTask(task.id)
      setShowDeleteModal(false)
      setTasks(tasks.filter(task => task.id !== deletedTaskId))

    } catch (error) {
      console.error('Error deleting the task:', error)
      //informar al usuario el error errorhandler
      setFeedbackState({message:'error deleting the task.', level: 'ERROR', visible: true})
    }

  }

  const onInfoTaskHandler = async () => {
    setShowInfoTaskModal(true)
  }

  const handleFeedbackAcceptClick = () => {
    setFeedbackState({ ...feedbackState, visible: false })
  }


  return (
    <>
     <ModalComponent
        title="Are you sure?"
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        form={
          <Confirm setShowModal={setShowDeleteModal} onDelete={onDeleteHandler} />
        }
      />
       <ModalComponent
        title="Task Infomation"
        show={showInfoTaskModal}
        onClose={() => setShowInfoTaskModal(false)}
        form={
          <InfoTask setShowModal={setShowInfoTaskModal} task={task} />
        }
        />
      <div className="flex items-center space-x-4">

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400" onClick={onInfoTaskHandler}>{task.description}</p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">{formatDate(task.dueDate)}</p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">{task.concurrency!=='None' && task.concurrency}</p>
          <BadgeComponent priority={task.priority}/>
        </div>
        <div className="inline-flex items-center space-x-4 text-base font-semibold text-gray-900 dark:text-white">
          <Checkbox
        id={`completed-${task.id}`}
        checked={task.completed}
        onChange={(event) => onUpdateHandler(event, task.id)}
      />
      <button
            onClick={ ()=>setShowDeleteModal(true)}
          >
            ❌
          </button>
      </div>
      </div>
          {feedbackState.visible && (
        <Feedback
          message={feedbackState.message}
          level={feedbackState.level}
          onAcceptClick={handleFeedbackAcceptClick}
          />
          )}
      </>
  )
}
