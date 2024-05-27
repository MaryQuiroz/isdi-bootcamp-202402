import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import retrieveTasks from '../logic/retrieveTasks'
import { TaskList } from './TaskList'
import { calculateAge } from '../utils'



export const CatProfile = () => {
    const {  cat, setTasks } = useContext(AppContext)

    useEffect(() => {
        retrieveTasks(cat.id).then(tasks=>setTasks(tasks))
    }, [])
    


    return (
        <>

            <div className="flex  flex-col items-center pb-10">
                <img
                    alt={cat.name}
                    src={cat.avatar}
                    className="w-48 h-48 mb-3 rounded-full shadow-lg"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{cat.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{calculateAge(cat.birthdate)}</span>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {cat.description}
                </p>

                
                <TaskList/>
            </div>





         
        </>
    )
}
