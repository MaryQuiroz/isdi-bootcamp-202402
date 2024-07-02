import dotenv from 'dotenv';
import { expect } from 'chai';
import mongoose from 'mongoose';

import { Task } from '../../models/Task.ts';
import { Cat } from '../../models/Cat.ts';
import updateTask from './updateTask.ts';
import { User } from '../../models/User.ts';

dotenv.config();

describe('updateTask', () => {
    let taskId: string;

    before(async () => {
        await mongoose.connect(process.env.MONGODB_TEST_URL);
        const user = await User.create({ name: 'Lisa', email: 'lisa@gmail.com', password: '123po123' });
        const cat = await Cat.create({
            user: user._id,
            name: 'Chimuelo',
            color: 'black',
            breed: 'criole',
            birthdate: new Date('2021-02-06'),
            avatar: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnJicjQwMGp0bG9nYWRkMHRjZDdhMWdqOHk5aWl0MjM3aDNyeHBhaiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/duNowzaVje6Di3hnOu/giphy.gif',
            description: 'is my first cat'
        });

        const task = await Task.create({
            title: 'Task 1',
            description: 'Description 1',
            priority: 'High',
            completed: 'true',
            dueDate: new Date('2023-12-31'),
            cat: cat._id,
            concurrency: 'Daily'
        });

        taskId = task._id.toString();
    });

    it('updates an existing task', async () => {
        const updatedTask = await updateTask(taskId, { title: 'Updated Task 1' });
        expect(updatedTask).to.have.property('title', 'Updated Task 1');
    });

    it('fails to update a task for non-existing taskId', async () => {
        try {
            await updateTask(new mongoose.Types.ObjectId().toString(), { title: 'Updated Task 1' });
            expect.fail('Expected updateTask to throw NotFoundError');
        } catch (error) {
            expect(error.message).to.equal('task not found');
        }
    });

    after(async () => {
        await Task.deleteMany({});
        await Cat.deleteMany({});
        await mongoose.disconnect();
    });
});
