import { expect } from 'chai'
import mongoose from 'mongoose'
import deleteCat from './deleteCat.ts'
import { errors } from 'com'
import { User } from '../../models/User.ts'
import { Cat } from '../../models/Cat.ts'

const { NotFoundError } = errors

describe('deleteCat', function() {
    let userId: string;
    let catId: string;

    before(async function() {
        await mongoose.connect(process.env.MONGODB_TEST_URL);
        await User.deleteMany()
        await Cat.deleteMany();

        const user = new User({ name: 'Test User', email: 'test@test.com', password: 'test123' });
        await user.save();
        userId = user._id.toString();

        const cat = new Cat({ name: 'Cat 1', user: user._id });
        await cat.save();
        catId = cat._id.toString();
    })

    it('should delete the cat of an existing user', async function() {
        await deleteCat(userId, catId);
        const deletedCat = await Cat.findById(catId);
        expect(deletedCat).to.be.null;
    })

    it('should throw a NotFoundError if the user does not exist', async function() {
        try {
            await deleteCat(new mongoose.Types.ObjectId().toString(), catId);
        } catch (error) {
            expect(error).to.be.an.instanceOf(NotFoundError);
            expect(error.message).to.equal('user not found');
        }
    })

    it('should throw a NotFoundError if the cat does not exist', async function() {
        try {
            await deleteCat(userId, new mongoose.Types.ObjectId().toString())
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
