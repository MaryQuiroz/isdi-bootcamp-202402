import dotenv from 'dotenv'
import mongoose from 'mongoose'


import { expect } from 'chai'
import { errors } from 'com'
import { User } from '../../models/User.ts'
import authenticateUser from './authenticateUser.ts'

dotenv.config()
const { CredentialsError, NotFoundError } = errors

describe('authenticateUser',() => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_TEST_URL)
        await User.deleteMany()

    })
    // 


    // it('succeeds on existing user and correct credentials', () =>

    //     User.deleteMany()
    //         .then(() => User.create({ name: 'Lisa', email: 'lisa@martin.com', password: '123qwe123' }))
    //         .then(user =>
    //             authenticateUser('lisa@martin.com', '123qwe123')
    //                 .then(userId => {
    //                     expect(userId).to.be.a('String')
    //                     expect(userId).to.equal(user.id)
    //                 })
    //         )
    // )

    // it('fails on existing user and incorrect password', () =>
    //     User.deleteMany()
    //         .then(() => User.create({ name: 'Lisa', email: 'lisa@martin.com', password: '123qwe123' }))
    //         .then(() => authenticateUser('lisa@martin.com', '123qwe123'))
    //         .catch(error => {
    //             expect(error).to.be.instanceOf(CredentialsError)
    //             expect(error.message).to.equal('wrong password')
    //         })
    // )

    it('fails on existing user and incorrect email', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'Lisa', email: 'lisa@martin.com', password: '123qwe123' }))
            .then(() => authenticateUser('paco@martin.com', '123qwe123'))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    )

    it('fails on non exiting user', () =>
        User.deleteMany()
            .then(() => authenticateUser('lisa@martin.com', '123qwe123'))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    )
    after(async function() {
        await User.deleteMany({});
        await mongoose.disconnect();
    });
})