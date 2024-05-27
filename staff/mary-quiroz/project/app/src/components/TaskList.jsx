import React, { useContext } from 'react'
import { Task } from './Task'

import { AppContext } from '../context/AppContext'
import { AddButton } from './AddButton'


export const TaskList = () => {
  const { tasks, setTasks } = useContext(AppContext)

  return (
    <>
   <AddButton text={"Add Task"}/>
    <div className='max-w-full pt-16 flex flex-col' style={{ minWidth: '100%' }}>
      {tasks && tasks.length === 0
        ? <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white flex-grow flex items-center justify-center">No Tasks</h5>
        : <>
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Tasks</h5>
            

          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 flex-grow">
            {tasks && tasks.map((task) => (
              <li key={task.id} className="py-3 sm:py-4">
                <Task task={task} />
              </li>
            )).reverse()}
          </ul>
        </>
      }
    </div>
   </>
  )
}