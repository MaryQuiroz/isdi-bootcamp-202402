import dotenv from 'dotenv'

import mongoose from 'mongoose'


import { expect } from 'chai'
import { errors } from 'com'
import { User } from '../../models/User.ts'
import { registerUser } from './registerUser.ts'

dotenv.config()

const { DuplicityError } = errors
describe('registerUser', () => {

    before(() => mongoose.connect(process.env.MONGODB_TEST_URL!))

    it('succeeds a new user', () =>
        User.deleteMany()
            .then(() => registerUser('Lisa', 'lisa@gmail.com', '123qwe123'))
            .then(() => User.findOne({ name: 'Lisa' }))
            .then((user: any) => {
                expect(!!user).to.be.true
                expect(user.name).to.equal('Lisa')
                expect(user.email).to.equal('lisa@gmail.com')
                expect(user.password).to.equal('123qwe123')
            })
    )

    it('fails on existing users', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'Lisa', email: 'lisa@gmail.com', password: '123qwe123' }))
            .then(() =>
                registerUser('Lisa', 'lisa@gmail.com', '123qwe123')
                    .catch(error => {
                        expect(error.message).to.equal('user already exists')
                    })
            )
    )

    it('fails on non string name', async () => {
        let errorThrown: any

        try {
            // @ts-ignore
            await registerUser(123, 'lisa@gmail.com', '123qwe123')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown.message).to.equal('name 123 is not a string')
    })

    it('fails on empty name', async () => {
        let errorThrown: any

        try {
            await registerUser('', 'pepe@roni.com', '123qwe123')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown.message).to.equal('name >< is empty or blank')
    })



    after(async function() {
        await User.deleteMany({})
        await mongoose.disconnect()
    })
})