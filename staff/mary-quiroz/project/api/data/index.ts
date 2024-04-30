import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type UserType = {
    name: string
    email: string
    password: string
}


const user = new Schema({
    name: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    }
})


type CatType = {
    name: string
    color: string
    breed: string
    age: number
    avatar: string
    user: ObjectId

}

const cat = new Schema({
    name: {
        type: String,
        required: true
    },

    color: {
        type: String,
        required: true
    },

    breed: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    avatar: {
        type: String,
        required: true
    },

    user: {
        type: ObjectId,
        ref: 'User',
        required: true

    }
   
})

type TaskType = {
    tittle: string
    description: string
    dueDate: Date
    completed: boolean
    cat: ObjectId
}

const task = new Schema({
    tittle: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true

    },

    dueDate: {
        type: Date,
        required: true

    },

    completed: {
        type: Boolean,
        required: true
    },

    cat: {
        type: ObjectId,
        ref: 'Cat',
        required: true
    }




})

const User = model<UserType>('User', user)
const Cat = model<CatType>('Cat', cat)
const Task = model<TaskType>('Task', task)
export {
    UserType,
    User,
    CatType,
    Cat,
    TaskType,
    Task
    
}