import dotenv from 'dotenv';
import { expect } from 'chai';
import mongoose from 'mongoose';

import retrieveTasks from './retrieveTasks.ts';
import { Task } from '../../models/Task.ts';
import { Cat } from '../../models/Cat.ts';
import { User } from '../../models/User.ts';
import { errors } from 'com';

dotenv.config();

const { NotFoundError } = errors
describe('retrieveTasks', () => {
    let catId: string;

    before(async () => {
        await mongoose.connect(process.env.MONGODB_TEST_URL);

        const user = await User.create({ name: 'Lisa', email: 'lisa@gmail.com', password: '123po123' });

        const cat = await Cat.create({
            user: user._id,
            name: 'Chimuelo',
            color: 'black',
            breed: 'criole',
            birthdate: new Date('2021-02-06'),
            avatar: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzNyc2lheDlmNjNiNmVlOHNqdjFrbjh2Z282NjNpNjkxNXdhMnZ3MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vFKqnCdLPNOKc/giphy.gif',
            description: 'is my first cat who is adopted'

        });

        catId = cat._id.toString();

        await Task.create({
            title: 'Task 1',
            description: 'Description 1',
            priority: 'High',
            dueDate: new Date('2023-12-31'),
            concurrency: 'Daily',
            cat: cat._id
        });

        await Task.create({
            title: 'Task 2',
            description: 'Description 2',
            priority: 'Medium',
            dueDate: new Date('2023-11-30'),
            concurrency: 'Daily',
            cat: cat._id
        });
    });

    it('retrieves all tasks for a given catId', async () => {
        const tasks = await retrieveTasks(catId);
        expect(tasks).to.be.an('array').that.is.not.empty;
        expect(tasks.length).to.equal(2);
        tasks.forEach(task => {
            expect(task).to.have.property('title');
            expect(task).to.have.property('description');
            expect(task).to.have.property('priority');
            expect(task).to.have.property('dueDate');
            expect(task).to.have.property('concurrency')
            expect(task.cat).to.have.property('name', 'Chimuelo');
        });
    });

    it('fails to retrieve tasks for a non-existing catId', async () => {
        try {
            await retrieveTasks(new mongoose.Types.ObjectId().toString());
            expect.fail('Expected retrieveTasks to throw NotFoundError');
        } catch (error) {
            expect(error).to.be.an.instanceOf(NotFoundError);
            expect(error.message).to.equal('No tasks found for the given catId');
        }
    });

    after(async () => {
        await Task.deleteMany({});
        await Cat.deleteMany({});
        await User.deleteMany({});
        await mongoose.disconnect();
    });
});
