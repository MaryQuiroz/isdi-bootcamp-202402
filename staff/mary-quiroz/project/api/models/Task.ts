import { ObjectId, Schema, model } from "mongoose"

enum Concurrency {
    None = 'None',
    Daily = 'Daily',
    Weekly = 'Weekly',
    Monthly = 'Monthly',
    Yearly = 'Yearly'
}
interface ITask extends Document {
    title: string
    description: string
    priority: string
    completed: boolean
    dueDate: Date
    cat: ObjectId
    concurrency: Concurrency
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
    },

    concurrency: {
        type: String,
        enum: ['Daily', 'Weekly', 'Monthly', 'Yearly', 'None'],
        required: true
    }


}, { 
    timestamps: true 
});

taskSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        ret.id = ret._id;
        ret.v = ret.__v;
        delete ret._id;  
        delete ret.__v;  
      return ret
    }
  });

const Task = model<ITask>('Task', taskSchema)
export {
    ITask,
    Task
    
}
