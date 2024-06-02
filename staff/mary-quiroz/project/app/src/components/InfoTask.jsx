import React from 'react'
import { formatDate } from '../utils/formatDate'
import { Card } from 'flowbite-react'
import { BadgeComponent } from './Badge'

export const InfoTask = ({setShowModal, task}) => {


  return (
        <div className="max-w-sm mx-auto my-4">
          <Card>
            <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.title}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{task.description}</p>
            <div className="mt-4">
              <p className="font-semibold">{task.concurrency!=='None' && task.concurrency}</p>
              <p className="font-semibold">{formatDate(task.dueDate)}</p>
              <BadgeComponent priority={task.priority}/>

            </div>
          </Card>
        </div>
      )
    }