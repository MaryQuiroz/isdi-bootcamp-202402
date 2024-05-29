import { errors, validate } from 'com'
import dotenv from 'dotenv'
import { Cat } from '../models/Cat'
import { ITask, Task } from '../models/Task'
import { User } from '../models/User'
import { Error, ObjectId, Types } from 'mongoose'
import { logger } from '../utils'
import addConcurrency from '../utils/addConcurrency'

dotenv.config()

const { NotFoundError, InvalidObjectIdError, ValidatorError, SystemError } = errors

enum Concurrency {
    None = 'None',
    Daily = 'Daily',
    Weekly = 'Weekly',
    Monthly = 'Monthly',
    Yearly = 'Yearly'
}

interface TaskParams {
    title: string
    description: string
    priority: string
    completed: boolean
    dueDate: string
    concurrency: Concurrency
}
export const createTaskService = async (userId: string, catId: string, taskData: TaskParams) => {

    try {
        const { title, description, priority, dueDate } = taskData

        validate.text(title, 'title')
        validate.text(description, 'description')
        validate.text(priority, 'high')
        validate.text(dueDate, '25-05-2024')
        validate.text(catId, 'cat')

        const userFinded = await User.findById(userId)

        if (!userFinded) {
            throw new NotFoundError('cat does not exists')
        }

        const catFinded = await Cat.findById(catId)

        if (!catFinded) throw new NotFoundError('Cat does not exists')

        const task = new Task({ ...taskData, cat: catId })
        const newTask = await task.save()
        return newTask


    } catch (error) {
        if (error instanceof Error.ValidationError) throw new ValidatorError(error.message)
        if (error instanceof Error.CastError) throw new ValidatorError(error.message)
        else {
            throw new ValidatorError(`Error creating task: ${error.message}`)
        }

    }

}

export const retrieveTasksService = async (catId) => {
    try {
        validate.text(catId, 'catId')

        const catFinded = await Cat.findById(catId)

        if (!catFinded) {
            throw new NotFoundError('Cat does not exists')
        }
        const tasks = await Task.find({ cat: catId }).populate('cat')
        return tasks
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export const updateTaskService = async (userId: string, taskId: string, taskData: any): Promise<ITask> => {
   
        validate.text(taskId, 'taskId')
        validate.text(userId, 'userId')

    try {
        if (!Types.ObjectId.isValid(userId)) throw new InvalidObjectIdError('Invalid ObjectId')

        const user = await User.findById(userId)
        if (!user) throw new NotFoundError('user not found')
        
            const taskFinded: any = await Task.findById(taskId).lean()
            if (!taskFinded) throw new NotFoundError('task not found')
    
            const concurrency = taskFinded.concurrency

            if (concurrency) {
                const newDueDate = addConcurrency(taskFinded.dueDate, concurrency)

                const taskCompleted = taskData.completed
                if (taskCompleted) {
                    const newTaskData: TaskParams = {
                        title: taskFinded.title,
                        description: taskFinded.description,
                        priority: taskFinded.priority,
                        completed: taskFinded.completed,
                        dueDate: newDueDate,
                        concurrency: taskFinded.concurrency
                    }
                    const catId = taskFinded.cat.toString()
                    await createTaskService(userId, catId, newTaskData)
                }
            }

        const taskUpdated = await Task.findByIdAndUpdate(taskId, taskData, { new: true })
        if (!taskUpdated) throw new NotFoundError('task not found')
        return taskUpdated

    } catch (error) {
        throw new SystemError(error.message)
    }

}

export const deleteTaskService = async (userId: string, taskId: string): Promise<Types.ObjectId> => {
    logger.info("updateTaskService")

    validate.text(taskId, 'taskId')
    validate.text(userId, 'userId')
    try {
        const taskDeleted = await Task.findByIdAndDelete(taskId)
        if (!taskDeleted) throw new NotFoundError('task not found')

        return taskDeleted._id
    } catch (error) {

        if (error instanceof Error.CastError) throw new ValidatorError(error.message)
        throw new SystemError(error.message)
    }

}