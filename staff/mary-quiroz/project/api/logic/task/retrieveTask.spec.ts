import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'

import { errors } from 'com'
import { Cat } from '../../models/Cat.ts'
import { Task } from '../../models/Task.ts'
import retrieveTask from './retrieveTask.ts'
import { User } from '../../models/User.ts'

const { Types: { ObjectId } } = mongoose

dotenv.config()

const { SystemError, NotFoundError } = errors

describe('retrieveTask', () => {
    let taskId: string

    before(async () => {
        await mongoose.connect(process.env.MONGODB_TEST_URL)

        const user = await User.create({ name: 'Lisa', email: 'lisa@gmail.com', password: '123po123' })

        const cat = await Cat.create({
            user: user._id,
            name: 'Chimuelo',
            color: 'black',
            breed: 'criole',
            birthdate: new Date('2021-02-06'),
            avatar: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzNyc2lheDlmNjNiNmVlOHNqdjFrbjh2Z282NjNpNjkxNXdhMnZ3MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vFKqnCdLPNOKc/giphy.gif',
            description: 'is my first cat who is adopted'
        })

        const task = await Task.create({
            title: 'Task 1',
            description: 'Description 1',
            priority: 'High',
            dueDate: new Date('2023-12-31'),
            cat: cat._id
        })

        taskId = task.id.toString()
    })

    it('retrieves an existing task', async () => {
        const task = await retrieveTask(taskId)
        expect(task).to.have.property('title', 'Task 1')
        expect(task).to.have.property('description', 'Description 1')
        expect(task).to.have.property('priority', 'High')
        expect(task).to.have.property('dueDate')
        expect(task.cat).to.have.property('name', 'Chimuelo')
    })

    it('fails to retrieve a task for non-existing taskId', async () => {
        try {
            await retrieveTask(new ObjectId().toString())
            expect.fail('Expected retrieveTask to throw SystemError')
        } catch (error) {
            expect(error).to.be.an.instanceOf(SystemError)
            expect(error.message).to.equal('task not found')
        }
    })

    after(async () => {
        await Task.deleteMany({})
        await Cat.deleteMany({})
        await User.deleteMany({})
        await mongoose.disconnect()
    })
})
