import dotenv from 'dotenv'

import mongoose from 'mongoose'

import { expect } from 'chai'
import { errors } from 'com'
import { User } from '../../models/User.ts'
import retrieveUser from './retrieveUser.ts'

dotenv.config()

const { Types: { ObjectId } } = mongoose
const { NotFoundError } = errors

describe('retrieveUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves existing user', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'Lisa', email: 'lisa@gmail.com', password: '123qwe123' }))
            .then(user =>
                User.create({ name: 'Magda', email: 'magda@gmail.com', password: '123qwe123' })
                    .then(user2 => retrieveUser(user.id, user2.id))
                    .then(user => {
                        expect(user.name).to.equal('Magda')
                        expect(user.email).to.equal('magda@gmail.com')
                    })
            )

    )

    it('does no retrieve by non-existing user', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'Lisa', email: 'lisa@gmail.com', password: '123qwe123' }))
            .then(user =>
                User.create({ name: 'Magda', email: 'magda@gmail.com', password: '123qwe123' })
                    .then(user2 => retrieveUser(new ObjectId().toString(), user2.id))
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('user not found')
                    })
            )
    )

    it('does no retrieve a non-existing target user', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'Pepe Roni', email: 'pepe@roni.com', password: '123qwe123' }))
            .then(user =>
                User.create({ name: 'Pepe Phone', email: 'pepe@phone.com', password: '123qwe123' })
                    .then(user2 => retrieveUser(user.id, new ObjectId().toString()))
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('target user not found')
                    })
            )
    )
    after(async function() {
        await User.deleteMany({})
        await mongoose.disconnect()
    });
})