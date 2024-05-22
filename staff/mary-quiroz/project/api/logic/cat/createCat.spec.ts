import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'

import { errors } from 'com'
import { NotFoundError } from 'com/errors.ts'
import createCat from './createCat.ts'
import { User } from '../../models/User.ts'
import { Cat } from '../../models/Cat.ts'
const { Types: { ObjectId } } = mongoose

dotenv.config()

const { SystemError } = errors

describe('createCat', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL));

    it('creates cat with name, color, breed, birthdate, avatar and description from existing user',
        () =>
            User.deleteMany()
                .then(() =>
                    User.create({ name: 'Lisa', email: 'lisa@gmail.com', password: '123po123' })
                        .then(user =>
                            createCat(user.id, 'chimuelo', 'black', 'criole', new Date('2021-02-06'), 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzNyc2lheDlmNjNiNmVlOHNqdjFrbjh2Z282NjNpNjkxNXdhMnZ3MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vFKqnCdLPNOKc/giphy.gif', 'is my first cat who is adopted')
                                .then(() =>
                                    Cat.findOne({})
                                        .then(cat => {
                                            expect(cat.name).to.equal('chimuelo')
                                            expect(cat.color).to.equal('black')
                                            expect(cat.breed).to.equal('criole')
                                            expect(cat.birthdate).to.be.instanceOf(Date)
                                            expect(cat.avatar).to.equal('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzNyc2lheDlmNjNiNmVlOHNqdjFrbjh2Z282NjNpNjkxNXdhMnZ3MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vFKqnCdLPNOKc/giphy.gif')
                                            expect(cat.description).to.equal('is my first cat who is adopted')
                                        })
                                )

                        )

                )
    )

    it('fails to create a cat with name, color, breed, birthdate, avatar a description non-existing user', () =>
        User.deleteMany()
            .then(() =>
                Cat.deleteMany()
                    .then(() =>
                        User.create({ name: 'Lisa', email: 'lisa@gmail.com', password: '123po123' })
                            .then(user =>
                                expect(createCat(new ObjectId().toString(), 'chimuelo', 'black', 'criole', new Date('2021-02-06'), 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzNyc2lheDlmNjNiNmVlOHNqdjFrbjh2Z282NjNpNjkxNXdhMnZ3MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vFKqnCdLPNOKc/giphy.gif', 'is my first cat who is adopted'))
                            ).catch(error => {
                                expect(error).to.be.an.instanceOf(NotFoundError);
                            })

                    )
            )
    )




    after(async () => {
        await Cat.deleteMany({});
        await mongoose.disconnect();
    });
})