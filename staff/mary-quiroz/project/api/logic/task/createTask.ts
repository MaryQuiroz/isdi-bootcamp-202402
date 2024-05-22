import { validate, errors } from "com"
import { Types } from "mongoose"
import { NotFoundError } from "com/errors.ts"
import { Task, ITask } from "../../models/Task.ts"
import { Cat } from "../../models/Cat.ts"
import jwt from 'jsonwebtoken'

const { SystemError } = errors

const { TokenExpiredError } = jwt

async function createTask(catId: string, title: string, description: string, priority: string, dueDate: Date): Promise<ITask> {
    // validate.text(userId, 'userId')
    validate.text(catId, 'catId')
    validate.text(title, 'title')
    validate.text(description, 'description')
    validate.text(priority, 'priority')

    let cat = null
    try {
        cat = await Cat.findById(new Types.ObjectId(catId))
        if (!cat) {
            throw new NotFoundError("cat not found")
        }
    } catch (error) {
        throw new SystemError(error.message)
    }

    const task: any = {
        title: title.trim(),
        description: description.trim(),
        priority: priority.trim(),
        dueDate: dueDate,
        cat: new Types.ObjectId(catId),
    }

    try {
        return await Task.create(task)
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default createTask
