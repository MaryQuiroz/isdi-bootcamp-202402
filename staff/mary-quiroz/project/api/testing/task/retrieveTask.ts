import { errors } from "com";
import { Task } from "../../models/Task.ts";
import { NotFoundError } from "com/errors.ts";

const { SystemError } = errors;

async function retrieveTask(taskId: string) {
    try {
        const task = await Task.findById(taskId).populate('cat');
        if (!task) {
            throw new NotFoundError("task not found");
        }
        return task;
    } catch (error) {
        throw new SystemError(error.message);
    }
}

export default retrieveTask;