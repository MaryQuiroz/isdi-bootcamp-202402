import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'

import { errors } from 'com'
import { Cat } from '../../models/Cat.ts'
import { Task } from '../../models/Task.ts'
import createTask from './createTask.ts'
import { User } from '../../models/User.ts'

const { Types: { ObjectId } } = mongoose

dotenv.config()

const { SystemError, NotFoundError } = errors

describe('createTask', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))
    it('creates task with title, description, priority, dueDate from existing cat', async () => {
        await Cat.deleteMany()
        const user = await  User.create({ name: 'Lisa', email: 'lisa@gmail.com', password: '123po123' })
       
    

        const cat = await Cat.create({ 
            user:user._id,
            name: 'Chimuelo', 
            color: 'black', 
            breed: 'criole', 
            birthdate: new Date('2021-02-06'), 
            avatar: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzNyc2lheDlmNjNiNmVlOHNqdjFrbjh2Z282NjNpNjkxNXdhMnZ3MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vFKqnCdLPNOKc/giphy.gif', 
            description: 'is my first cat who is adopted'
        })
    
        await createTask(cat.id, 'Task 1', 'Description 1', 'High', new Date('2023-12-31'))
    
        const task = await Task.findOne({})
        expect(task.title).to.equal('Task 1')
        expect(task.description).to.equal('Description 1')
        expect(task.priority).to.equal('High')
        expect(task.dueDate).to.be.instanceOf(Date)
        expect(task.concurrency).to.equal('High')
        expect(task.cat.toString()).to.equal(cat.id)
    })

    it('fails to create a task with title, description, priority, dueDate for non-existing cat', async () => {
        await Cat.deleteMany()
        await Task.deleteMany()
        
        try {
            await createTask(new ObjectId().toString(), 'Task 1', 'Description 1', 'High', new Date('2023-12-31'))
            expect.fail('Expected createTask to throw NotFoundError')
        } catch (error) {
            expect(error).to.be.an.instanceOf(SystemError)
            expect(error.message).to.equal('cat not found')
        }
    })
    after(() => mongoose.disconnect())
})
