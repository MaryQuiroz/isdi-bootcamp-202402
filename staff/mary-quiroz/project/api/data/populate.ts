import mongoose from 'mongoose'

import { User, Cat, Task } from '.'


mongoose.connect('mongodb://localhost:27017/test')
    .then(() => User.deleteMany())
    .then(() => Cat.deleteMany())
    .then(() => User.create({ name: 'Lisa', email: 'lisa@gmail.com',  password: '123po123' }))
    .then(user1 => {
        let count = 1

        const cat1 = {name: 'chimuelo', color: 'black', breed: 'criole', birthdate: Date, avatatar: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDV3cGNxdHk1NmhtaHdwNzd1cWN6eTU5bXl0N3YxeHhhaXBrYWx3ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YJ85eVpdZDy7e/giphy.gif', description: 'is my first adopted cat'}




    })
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)
