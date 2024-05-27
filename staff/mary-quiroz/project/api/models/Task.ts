import { ObjectId, Schema, model } from "mongoose"

interface ITask extends Document {
    title: string
    description: string
    priority: string
    completed: boolean
    dueDate: Date
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

}, { 
    timestamps: true 
});

taskSchema.set('toJSON', {
    transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  });

const Task = model<ITask>('Task', taskSchema)
export {
    ITask,
    Task
    
}
