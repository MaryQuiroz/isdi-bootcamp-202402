import { errors } from "com";
import { Task } from "../../models/Task.ts";
const  { NotFoundError, SystemError } = errors

async function updateTask(taskId: string, updateData: any) {
    try {
        const task = await Task.findByIdAndUpdate(taskId, updateData, { new: true }).populate('cat');
        if (!task) {
            throw new NotFoundError("task not found");
        }
        return task;
    } catch (error) {
        throw new SystemError(error.message);
    }
}

export default updateTask;
