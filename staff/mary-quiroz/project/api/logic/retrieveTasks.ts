import { Schema } from 'mongoose'

const { Types: { ObjectId } } = Schema

import { Task, TaskType } from '../data/index.ts'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

function retrieveTasks(catId: string): Promise<TaskType> {
    validate.text(catId, 'catId', true)

    return Task.find({cat:catId})
    .catch(error => { throw new SystemError(error.message) })
    .then(tasks => {
        if(!tasks) throw new NotFoundError(`tasks by ${catId} not found`)

        return tasks
        
    })
    .then(tasks => {
        if(!tasks) throw new NotFoundError(`tasks by ${catId} not found`)
            return tasks
    })

}

export default retrieveTasks