import {  Checkbox } from 'flowbite-react'
import React from 'react'
import { BadgeComponent } from './BadgeComponent'

export const Task = ({task}) => {

  return (
      <div className="flex items-center space-x-4">

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
          <BadgeComponent priority={task.priority}/>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"><Checkbox id="completed" /></div>
      </div>
  )
}
