import dotenv from 'dotenv'

import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { errors } from 'com'
import { User } from '../../models/User.ts'
import { Cat, ICat } from '../../models/Cat.ts'
import catService from '../../services/catService.ts'

dotenv.config()

const { Types: { ObjectId } } = mongoose
const { NotFoundError } = errors

describe('retrieveCat', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))
    

    it('retrieves existing cat', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'Lisa', email: 'lisa@gmail.com', password: '123qwe123' }))
            .then(user =>
                Cat.create({ user: new Types.ObjectId(user.id), name: 'chimu', color: 'black', breed: 'criole', birthdate: Date(), avatar: 'https://media.giphy.com/media/L1yciy6Uh88whfUCyT/giphy.gif?cid=790b7611pgnfio09uzbasd799e2zbxfsj4gqeav39iumxhc3&ep=v1_gifs_search&rid=giphy.gif&ct=g', description: 'this is my first cat' })
                    .then(cat => catService.retrieveCat(user.id,cat.id))
                    .then((cat: ICat) => {
                        expect(cat.name).to.equal('chimu')
                        expect(cat.color).to.equal('black')
                    })
            )

    )

    it('does no retrieve by non-existing cat', () =>
        User.deleteMany()
            .then(() => {
                Cat.deleteMany()
                    .then(() => {
                        User.create({ name: 'Lisa', email: 'lisa@gmail.com', password: '123qwe123' })
                            .then(user =>
                                Cat.create({ user: new Types.ObjectId(user.id), name: 'chimu', color: 'black', breed: 'criole', birthdate: Date(), avatar: 'https://media.giphy.com/media/L1yciy6Uh88whfUCyT/giphy.gif?cid=790b7611pgnfio09uzbasd799e2zbxfsj4gqeav39iumxhc3&ep=v1_gifs_search&rid=giphy.gif&ct=g', description: 'this is my first cat' })
                            )
                            .then(cat=>catService.retrieveCat(new ObjectId().toString(), cat.id))
                            .catch(error => {
                                expect(error).to.be.instanceOf(NotFoundError)
                                expect(error.message).to.equal('cat not found')
                            })
                    }
                    )

            })

    )

    
   

    after(async () => {
        await Cat.deleteMany({})
        await mongoose.disconnect()
    })
})