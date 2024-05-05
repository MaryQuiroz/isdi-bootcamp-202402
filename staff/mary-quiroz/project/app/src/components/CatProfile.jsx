import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import retrieveTasks from '../logic/retrieveTasks'
import { TaskList } from './TaskList'



export const CatProfile = () => {
    const { cat, tasks, setTasks } = useContext(AppContext)

    useEffect(() => {
        retrieveTasks(cat._id).then(tasks=>setTasks(tasks))
    }, [])
    


    return (
        <>

            <div className="flex flex-col items-center pb-10">
                <img
                    alt={cat.name}
                    src={cat.avatar}
                    className="w-48 h-48 mb-3 rounded-full shadow-lg"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{cat.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{cat.age}</span>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {cat.description}
                </p>

                
                <TaskList/>
            </div>





            {/* <div className="bg-white shadow-md rounded p-4">
                <h2 className="text-2xl font-bold">{cat.name}</h2>
                <p className="text-lg">{cat.description}</p>
                <p className="text-lg">{cat.age}</p>
                <img src={cat.avatar} alt={cat.name} className="w-48 h-48 rounded-full" />

                <Link to={`/cats/${cat._id}/editar`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Editar perfil
                </Link>
            </div> */}
        </>
    )
}
