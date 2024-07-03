import { errors, validate } from 'com'
import dotenv from 'dotenv'
import { Cat } from '../models/Cat.ts'
import { ITask, Task } from '../models/Task.ts'
import { User } from '../models/User.ts'
import { Error, ObjectId, Types } from 'mongoose'
import addConcurrency from '../utils/addConcurrency.ts'

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
const createTask = (userId: string, catId: string, taskData: TaskParams) => {
    const { title, description, priority, dueDate, concurrency } = taskData

    validate.text(title, 'title')
    validate.text(description, 'description')
    validate.text(priority, 'high')
    validate.text(dueDate, '25-05-2024')
    validate.text(concurrency, 'Daily')
    validate.text(catId, 'cat')

    let userFinded
    let catFinded

    return User.findById(userId)

        .then((user) => {
            userFinded = user

            if (!userFinded) {
                throw new NotFoundError('User not found')
            }

            return Cat.findById(catId)
        })
        .then((cat) => {
            catFinded = cat

            if (!catFinded) {
                throw new NotFoundError('Cat does not exists')
            }

            const task = new Task({ ...taskData, cat: catId })
            return task.save()

        })
        .then(newTask => {
            return newTask
        })

        .catch(error => {
            if (error instanceof ValidatorError) {
                throw new ValidatorError(error.message)
            } else {
                throw new SystemError(`Error creating task ${error.message}`)
            }
        })
}

const retrieveTasks = (catId) => {
    
        validate.text(catId, 'catId')

        return Cat.findById(catId)

        .then(catFinded => {

            if (!catFinded) {
                throw new NotFoundError('Cat does not exists')
            }

            return Task.find({ cat: catId }).populate('cat')
        })
        .then(tasks => {

            return tasks
        })

    .catch (error => {
        throw new SystemError(error.message)

    })  
}

const updateTask = (userId: string, taskId: string, taskData: any): Promise<ITask> => {
    validate.text(taskId, 'taskId');
    validate.text(userId, 'userId');

    return User.findById(userId)
        .then(user => {
            if (!Types.ObjectId.isValid(userId)) throw new InvalidObjectIdError('Invalid ObjectId');
            if (!user) throw new NotFoundError('user not found');

            return Task.findById(taskId).lean();
        })
        .then(taskFinded => {
            if (!taskFinded) throw new NotFoundError('task not found');

            const concurrency = taskFinded.concurrency;
            if (concurrency) {
                const newDueDate = addConcurrency(taskFinded.dueDate, concurrency);
                const taskCompleted = taskData.completed;

                if (taskCompleted) {
                    const newTaskData: TaskParams = {
                        title: taskFinded.title,
                        description: taskFinded.description,
                        priority: taskFinded.priority,
                        completed: taskFinded.completed,
                        dueDate: newDueDate,
                        concurrency: taskFinded.concurrency
                    };
                    const catId = taskFinded.cat.toString();
                    return createTask(userId, catId, newTaskData).then(() => {
                        return Task.findByIdAndUpdate(taskId, taskData, { new: true });
                    });
                }
            }

            return Task.findByIdAndUpdate(taskId, taskData, { new: true });
        })
        .then(taskUpdated => {
            if (!taskUpdated) throw new NotFoundError('task not found');
            return taskUpdated;
        })
        .catch(error => {
            throw new SystemError(error.message);
        });
};


const deleteTask = (userId: string, taskId: string): Promise<Types.ObjectId> => {


    validate.text(taskId, 'taskId')
    validate.text(userId, 'userId')
   

        return Task.findByIdAndDelete(taskId)
        .then(taskDeleted => {

            if (!taskDeleted) throw new NotFoundError('task not found')
    
            return taskDeleted.id
        })
    .catch (error => {
        if (error instanceof Error.CastError) throw new ValidatorError(error.message)
        throw new SystemError(error.message)

    }) 

}

export default {
    createTask,
    retrieveTasks,
    updateTask,
    deleteTask
}