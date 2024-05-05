import React, { useContext } from 'react'
import { Task } from './Task'
import { AppContext } from '../context/AppContext'

export const TaskList = () => {
  const { tasks } = useContext(AppContext)
  return (
    <div className='max-w-sm pt-16'>
      {tasks.length == 0
        ? <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">No Tasks</h5>
        : <>
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Tasks</h5>
            <a href="#" className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
              View all
            </a>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {tasks.map((task) => (
              <li key={task._id} className="py-3 sm:py-4">
                <Task task={task} />
              </li>
            ))}</ul>
        </>

      }
    </div>
  )
}
