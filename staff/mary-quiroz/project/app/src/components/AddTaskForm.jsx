import { Button, Label, Select, TextInput } from 'flowbite-react'
import React, { useContext, useRef } from 'react'
import { logger } from '../utils'
import createTask from '../logic/createTask'
import { AppContext } from '../context/AppContext'

export const AddTaskForm = ({setShowModal, catId}) => {

    const { cat, setTasks, tasks } = useContext(AppContext)

    const titleRef =  useRef(null)
    const descriptionRef = useRef(null)
    const prioritiesRef = useRef (null)
    const dueDateRef = useRef (null)

   
        const onAddTaskHandler =  async () => {
            event.preventDefault()
            try {
            const title = titleRef.current.value
            const description = descriptionRef.current.value
            const priority = prioritiesRef.current.value
            const dueDate = dueDateRef.current.value

            const task = {
                title,
                description,
                priority,
                dueDate,
                catId
            }

                const newTask = await createTask(task)
                setShowModal(false)
                setTasks([...tasks, newTask])
            } catch (error) {
                console.error(error)
                
            }



            logger.debug('AddTaskForm -> onAddTaskHandler', title, description, priority, dueDate, )
        }

       

    return (
        <form onSubmit={onAddTaskHandler} className="flex max-w flex-col gap-2">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="title" value="Title" />
                </div>
                <TextInput ref={titleRef} id="title" type="title" placeholder="Buy food" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="description" value="Description" />
                </div>
                <TextInput ref={descriptionRef} id="description" type="text" placeholder="buy food at Mercadona" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="priority" value="Select your Priority" />
                </div>
                <Select ref={prioritiesRef} id="priorities" required>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </Select>
                </div>
            <div>
                <div className="mb-2 block" >
                <Label htmlFor="dueDate" value="DueDate" />
                </div>
            <TextInput ref={dueDateRef} id="dueDate" type="date" placeholder="20/05/2022" required />
               
            
            </div>

            
            <Button type="submit">Save</Button>
        </form>
    )
}
