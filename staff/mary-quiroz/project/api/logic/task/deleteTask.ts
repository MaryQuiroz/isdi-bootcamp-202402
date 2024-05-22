import { errors } from "com"
import { Task } from "../../models/Task.ts"
import { NotFoundError, SystemError } from "com/errors.ts"

async function deleteTask(taskId: string) {
    try {
        const task = await Task.findByIdAndDelete(taskId)
        if (!task) {
            throw new NotFoundError("task not found")
        }
        return task
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default deleteTask
