import { errors, validate } from 'com'
import dotenv from 'dotenv'
import { Cat } from '../models/Cat'
import { ITask, Task } from '../models/Task'
import { User } from '../models/User'
import { Error, Types } from 'mongoose'

dotenv.config()

const { NotFoundError, InvalidObjectIdError, ValidatorError } = errors

export const createTaskService = async (userId, catId, taskData) => {

    try {
    const { title, description, priority, dueDate, concurrency } = taskData

    validate.text(title, 'title')
    validate.text(description, 'description')
    validate.text(priority, 'high')
    validate.text(concurrency, 'dayli')
    validate.text(dueDate, '25-05-2024')
    validate.text(catId, 'cat')

    const userFinded = await User.findById( userId )

    if(!userFinded) {
        throw new NotFoundError('cat does not exists')
    }

    const catFinded = await Cat.findById( catId )

    if(!catFinded) throw new NotFoundError('Cat does not exists')

    const task = new Task({...taskData, cat:catId})
    const newTask = await task.save()

    return newTask


 } catch (error) {
        if (error instanceof Error.ValidationError) throw new ValidatorError(error.message)
        if (error instanceof Error.CastError) throw new ValidatorError(error.message)
        else{
            throw new ValidatorError(`Error creating task: ${error.message}`);
    }
       
    }
    
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