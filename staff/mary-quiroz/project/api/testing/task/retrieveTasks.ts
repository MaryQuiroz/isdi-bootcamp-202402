import { errors } from "com";
import { Task } from "../../models/Task.ts";
const { NotFoundError, SystemError } = errors;


async function retrieveTasks(catId: string) {
    try {
        const tasks = await Task.find({ cat: catId }).populate('cat');
        if (tasks.length === 0) {
            throw new NotFoundError("No tasks found for the given catId");
        }
        return tasks;
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        } else {
            throw new SystemError(error.message);
        }
    }
}

export default retrieveTasks;
