import {  Checkbox } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { BadgeComponent } from './Badge'
import { AppContext } from '../context/AppContext'
import { ModalComponent } from "./Modal"
import { formatDate } from '../utils/formatDate'
import updateTask from '../logic/updateTask'
import  Confirm  from "./Confirm"
import deleteTask from '../logic/deleteTask'

export const Task = ({task}) => {
  const { tasks, setTasks } = useContext(AppContext)
  const [showModal, setShowModal] = useState(false)

  const onUpdateHandler = async(event, taskId) => {
    const taskData = {
      completed: event.target.checked,
    }

    const updatedTask = await updateTask(taskId, taskData)
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
  }

  const onDeleteHandler = async () => {
    const deletedTaskId = await deleteTask(task.id)
    setShowModal(false)
    setTasks(tasks.filter(task => task.id !== deletedTaskId));

  }

  return (
    <>
     <ModalComponent
        title="Are you sure?"
        show={showModal}
        onClose={() => setShowModal(false)}
        form={
          <Confirm setShowModal={setShowModal} onDelete={onDeleteHandler} />
        }
      />
      <div className="flex items-center space-x-4">

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">{formatDate(task.dueDate)}</p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">{task.concurrency!=='None'&&task.concurrency}</p>
          <BadgeComponent priority={task.priority}/>
        </div>
        <div className="inline-flex items-center space-x-4 text-base font-semibold text-gray-900 dark:text-white">
          <Checkbox
        id={`completed-${task.id}`}
        checked={task.completed}
        onChange={(event) => onUpdateHandler(event, task.id)}
      />
      <button
            onClick={ ()=>setShowModal(true)}
          >
            ❌
          </button>
      </div>
      </div>
      </>
  )
}
