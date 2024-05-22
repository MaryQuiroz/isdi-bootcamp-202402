import { ObjectId, Schema, model } from "mongoose"

type TaskType = {
    title: string
    description: string
    priority: string
    completed: boolean
    cat: ObjectId
}

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true

    },

    priority: {
        type: String,
        required: true

    },

    completed: {
        type: Boolean,
        default: false
    },

    dueDate : {
        type: Date,
        required: true,
    },

    cat: {
        type: Schema.Types.ObjectId,
        ref: 'Cat',
        required: true
    }

}, { toJSON: { virtuals: true }, id: false, timeStamp: true });

taskSchema.virtual('id').get(function () {
    return this._id.toHexString();
});


const Task = model<TaskType>('Task', taskSchema)
export {
    TaskType,
    Task
    
}
