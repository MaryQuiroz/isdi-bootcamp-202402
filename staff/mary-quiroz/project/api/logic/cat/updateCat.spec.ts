import { expect } from 'chai'
import mongoose from 'mongoose'
import { errors } from 'com'
import { User } from '../../models/User.ts'
import { Cat } from '../../models/Cat.ts'
import { updateCatService } from '../../services/catService.ts'

const { NotFoundError } = errors
describe('updateCat', function() {
    let userId: string
    let catId: string

    before(async function() {
        await mongoose.connect(process.env.MONGODB_TEST_URL, {  })

        await User.deleteMany()
        await Cat.deleteMany()
        

        const user = new User({ name: 'Test User', email: 'test@test.com', password: 'test123' })
        await user.save()
        userId = user._id.toString()

        const cat = new Cat({ name: 'Cat 1', user: user._id })
        await cat.save()
        catId = cat._id.toString()
    })

    it('should update the cat of an existing user', async function() {
        const updateData = { name: 'Cap Updated!' }
        const updatedCat = await updateCatService(userId, catId, updateData)

        expect(updatedCat).to.have.property('name', 'Cap Updated!')
        expect(updatedCat.user.toString()).to.equal(userId)
    })

    it('should throw a NotFoundError if the user does not exist', async function() {
        try {
            await updateCatService(new mongoose.Types.ObjectId().toString(), catId, { name: 'Cap Updated!' })
        } catch (error) {
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    it('should throw a NotFoundError if the cat does not exist', async function() {
        try {
            await updateCatService(userId, new mongoose.Types.ObjectId().toString(), { name: 'Cap Updated!' })
        } catch (error) {
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal('cat not found')
        }
    })

    after(async function() {
        await User.deleteMany({})
        await Cat.deleteMany({})
        await mongoose.disconnect()
    })
})
