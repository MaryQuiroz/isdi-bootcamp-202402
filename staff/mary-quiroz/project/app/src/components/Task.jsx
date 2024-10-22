import { Checkbox } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { BadgeComponent } from './Badge'
import { AppContext } from '../context/AppContext'
import { ModalComponent } from "./Modal"
import { formatDate } from '../utils/formatDate'
import updateTask from '../logic/updateTask'
import Confirm from "./Confirm"
import deleteTask from '../logic/deleteTask'
import { InfoTask } from './InfoTask'
import retrieveTasks from '../logic/retrieveTasks'
import RoundButton from './library/RoundButton'

export const Task = ({task}) => {
  const { tasks, setTasks, showFeedback } = useContext(AppContext)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showInfoTaskModal, setShowInfoTaskModal] = useState(false)

  const onUpdateHandler = (event, taskId) => {
    const completed = event.target.checked;
    
    updateTask(taskId, { completed })
        .then(() => {
            return retrieveTasks(task.cat.id || task.cat);
        })
        .then((allTasks) => {
            setTasks(allTasks);
        })
        .catch(error => showFeedback(error.message, 'error'))
  };

  const onDeleteHandler = () => {
      deleteTask(task.id)
      .then((deletedTaskId) => {
        setShowDeleteModal(false)
        setTasks(tasks.filter(task => task.id !== deletedTaskId))

        return retrieveTasks(task.cat.id || task.cat)
      })
      .catch(error => showFeedback(error.message, 'error'))
  }

  const onInfoTaskHandler = async () => {
    setShowInfoTaskModal(true)
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
        title="Task Information"
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
            onClick={() => setShowDeleteModal(true)}
          >
            ❌
          </button>
        </div>
      </div>
    </>
  )
}
