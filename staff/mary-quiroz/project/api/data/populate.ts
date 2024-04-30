import mongoose from 'mongoose'

import { User } from '.'


mongoose.connect('mongodb://localhost:27017/project')
    .then(() => User.deleteMany())
   // .then(() => Post.deleteMany())
    .then(() => User.create({ name: 'Chimuelo', email: 'chimu@gmail.com',  password: '123po123' }))
    .then(user1 => {
        let count = 1

    })
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)
