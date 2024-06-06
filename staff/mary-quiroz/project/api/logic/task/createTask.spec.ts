import { expect } from 'chai';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Cat } from '../../models/Cat.ts';
import { Task } from '../../models/Task.ts';
import { User } from '../../models/User.ts';
import { createTaskService } from '../../services/taskService.ts';

dotenv.config();

enum Concurrency {
    None = 'None',
    Daily = 'Daily',
    Weekly = 'Weekly',
    Monthly = 'Monthly',
    Yearly = 'Yearly'
  }

describe('createTaskService', () => {
  let userId: mongoose.Types.ObjectId;
  let catId: mongoose.Types.ObjectId;

  before(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URL);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Cat.deleteMany({});
    await Task.deleteMany({});

    const user = new User({ email: 'test@example.com', name: 'Luisa', password: '123po123' });
    await user.save();
    userId = user._id;

    const cat = new Cat({ name: 'sia', description:'first', avatar:'www.image.com', birthdate:'2001-05-02', breed:'criole', color:'blue', user: user.id });
    await cat.save();
    catId = cat._id;
  });

  it('should create a task successfully', async () => {
    const taskData = {
      title: 'Task 1',
      description: 'Description 1',
      priority: 'High',
      completed: false,
      dueDate: '2023-12-31', 
      concurrency: Concurrency.Daily,
    };

    const newTask = await createTaskService(userId.toString(), catId.toString(), taskData);

    const task = await Task.findById(newTask._id).populate('cat')
    expect(task.title).to.equal('Task 1');
    expect(task.description).to.equal('Description 1');
    expect(task.priority).to.equal('High');
    expect(task.completed).to.equal(false);
    expect(task.dueDate.toISOString()).to.equal(new Date('2023-12-31').toISOString());
    expect(task.concurrency).to.equal('Daily');
  });

  // it('should throw NotFoundError if user does not exist', async () => {
  //   const nonExistentUserId = new mongoose.Types.ObjectId();
  //   const taskData = {
  //     title: 'Task 1',
  //     description: 'Description 1',
  //     priority: 'High',
  //     completed: false,
  //     dueDate: '2023-12-31',
  //     concurrency: Concurrency.Daily,
  //   };

  //   try {
  //     await createTaskService(nonExistentUserId.toString(), catId.toString(), taskData);
  //   } catch (error) {
  //     expect(error).to.be.instanceOf(Error);
  //     expect(error.message).to.equal('cat does not exists');
  //   }
  // });

  // it('should throw NotFoundError if cat does not exist', async () => {
  //   const nonExistentCatId = new mongoose.Types.ObjectId();
  //   const taskData = {
  //     title: 'Task 1',
  //     description: 'Description 1',
  //     priority: 'High',
  //     completed: false,
  //     dueDate: '2023-12-31',
  //     concurrency: Concurrency.Daily,
  //   };

  //   try {
  //     await createTaskService(userId.toString(), nonExistentCatId.toString(), taskData);
  //   } catch (error) {
  //     expect(error).to.be.instanceOf(Error);
  //     expect(error.message).to.equal('Cat does not exists');
  //   }
  // });

  // it('should throw ValidationError for invalid task data', async () => {
  //   const invalidTaskData = {
  //     title: '',
  //     description: 'Description 1',
  //     priority: 'High',
  //     completed: false,
  //     dueDate: '2023-12-31',
  //     concurrency: Concurrency.Daily,
  //   };

  //   try {
  //     await createTaskService(userId.toString(), catId.toString(), invalidTaskData);
  //   } catch (error) {
  //     expect(error).to.be.instanceOf(Error);
  //     expect(error.message).to.include('ValidationError');
  //   }
  // });
});
