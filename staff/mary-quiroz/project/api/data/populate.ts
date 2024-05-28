import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
import { User } from '../models/User'
import { Cat } from '../models/Cat'
import { Task } from '../models/Task'
import { registerUserService } from '../services/userService'

configDotenv()


mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err))


const users = [
    { name: 'Mary Quiroz', email: 'Mary@Quiroz.com', password: 'password123' },
    { name: 'Cielo Rodriguez', email: 'Cielo@Rodriguez.com', password: 'password123' }
  ]
  
 
  const catsData = [
    { name: 'Mittens', color: 'Black', breed: 'Siamese', birthdate: new Date(2020, 1, 1), avatar: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzVnb3U4ZnpuYzJodmt6cGl0NzFmZXFzZjU4ZmZybWVkdmpmcDZkcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MDJ9IbxxvDUQM/giphy.gif', description: 'A playful cat.' },
    { name: 'Fluffy', color: 'White', breed: 'Persian', birthdate: new Date(2019, 5, 15), avatar: 'https://media.giphy.com/media/nR4L10XlJcSeQ/giphy.gif?cid=790b7611w5gou8fznc2hvkzpit71feqsf58ffrmedvjfp6dq&ep=v1_gifs_search&rid=giphy.gif&ct=g', description: 'A calm and loving cat.' }
  ]
  
  const tasksData = [
    { title: 'Feed Mittens', description: 'Feed Mittens her favorite food.', priority: 'High', completed: false, dueDate: new Date(), concurrency: 'Daily' },
    { title: 'Groom Fluffy', description: 'Groom Fluffy and clean her fur.', priority: 'Medium', completed: false, dueDate: new Date(), concurrency: 'Weekly' }
  ]
  

  const seedDatabase = async () => {
    try {
      await User.deleteMany({})
      await Cat.deleteMany({})
      await Task.deleteMany({})
  
     
      const savedUsers = await Promise.all(users.map(user => registerUserService(user)))
  
      
      const cats = [
        { ...catsData[0], user: savedUsers[0]._id },
        { ...catsData[1], user: savedUsers[1]._id }
      ]
      const savedCats = await Cat.insertMany(cats)
  
      
      const tasks = [
        { ...tasksData[0], cat: savedCats[0]._id },
        { ...tasksData[1], cat: savedCats[1]._id }
      ]
      await Task.insertMany(tasks)
  
      console.log('Database seeded successfully')
    } catch (err) {
      console.error('Error seeding database:', err)
    } finally {
      mongoose.disconnect()
    }
  }
  
 
  seedDatabase()