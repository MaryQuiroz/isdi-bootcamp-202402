import { validate } from 'com'
import dotenv from 'dotenv'
import { Cat } from '../models/Cat'
import { InvalidObjectIdError, NotFoundError } from 'com/errors'
import { ITask, Task } from '../models/Task'
import { User } from '../models/User'
import { Types } from 'mongoose'

dotenv.config()

export const createTaskService = async (taskData) => {

    const { title, description, priority, dueDate, cat } = taskData

    validate.text(title, 'title')
    validate.text(description, 'description')
    validate.text(priority, 'priority')
    validate.text(dueDate, 'priority')
    validate.text(cat, 'cat')

    const catFinded = await Cat.findById( cat )

    if(!catFinded) {
        throw new NotFoundError('cat does not exists')
    }

    const task = new Task(taskData)
    const newTask = await task.save()
    return newTask
}

export const retrieveTasksService = async (catId) => {
    validate.text(catId, 'catId')

    const catFinded =await Cat.findById( catId )

    if(!catFinded) {
        throw new NotFoundError('Cat does not exists')
    }
    const tasks = await Task.find({ cat: catId }).populate('cat')
    return tasks
}

export const updateTaskService = async (userId: string, taskId: string, taskData:any) : Promise<ITask> => {
    validate.text(taskId, 'taskId')
    validate.text(userId, 'userId')

    if (!Types.ObjectId.isValid(userId)) throw new InvalidObjectIdError('Invalid ObjectId')
  
  
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError('user not found')
      
        const taskUpdated = await Task.findByIdAndUpdate(taskId, taskData,{new:true})
        if (!taskUpdated) throw new NotFoundError('task not found')
        taskUpdated.id=taskUpdated._id
        return taskUpdated

    
}