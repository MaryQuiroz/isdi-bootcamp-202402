import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'

import deleteTask from './deleteTask.ts'
import { Task } from '../../models/Task.ts'
import { Cat } from '../../models/Cat.ts'
import { errors } from 'com'
import { User } from '../../models/User.ts'
const { NotFoundError } = errors


dotenv.config()

describe('deleteTask', () => {
    let taskId: string

    before(async () => {
        
        await mongoose.connect(process.env.MONGODB_TEST_URL)
        await User.deleteMany({})
        const user = await User.create({ name: 'Lisa', email: 'lisa@gmail.com', password: '123po123' })


        const cat = await Cat.create({
            user: user._id,
            name: 'Chimuelo',
            color: 'black',
            breed: 'criole',
            birthdate: new Date('2021-02-06'),
            avatar:' https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnJicjQwMGp0bG9nYWRkMHRjZDdhMWdqOHk5aWl0MjM3aDNyeHBhaiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/duNowzaVje6Di3hnOu/giphy.gif',
            description: 'this is my first cat',


        })

        const task = await Task.create({
            title: 'Task 1',
            description: 'Description 1',
            priority: 'High',
            completed: 'true',
            dueDate: new Date('2023-12-31'),
            cat: cat._id,
            concurrency: 'Daily'

        })

        taskId = task.id.toString()
    })

    it('deletes an existing task', async () => {
        await deleteTask(taskId)
        const task = await Task.findById(taskId)
        expect(task).to.be.null
    })


    after(async () => {
        await User.deleteMany({})
        await Task.deleteMany({})
        await Cat.deleteMany({})
        await mongoose.disconnect()
    })
})