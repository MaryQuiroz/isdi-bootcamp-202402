import { expect } from 'chai'
import mongoose, { Types } from 'mongoose'
import { errors, validate } from 'com'
import { User } from '../../models/User.ts'
import { Cat } from '../../models/Cat.ts'
import catService from '../../services/catService.ts'

const { NotFoundError, SystemError, InvalidObjectIdError } = errors

describe('deleteCatService', function() {
    let userId: string;
    let catId: string;

    before(async function() {
        try {
            await mongoose.connect(process.env.MONGODB_TEST_URL);
            await User.deleteMany()
            await Cat.deleteMany();

            const user = new User({ name: 'Test User', email: 'test@test.com', password: 'test123' });
            await user.save();
            userId = user.id.toString();

            const cat = await catService.createCat({
                userId,
                name:'chimuelo', 
                color:'black', 
               breed: 'criole', 
                birthdate:new Date('2021-02-06'), 
                avatar:'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzNyc2lheDlmNjNiNmVlOHNqdjFrbjh2Z282NjNpNjkxNXdhMnZ3MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vFKqnCdLPNOKc/giphy.gif', 
                description:'is my first cat who is adopted'
            });
            catId = cat.id.toString();
        } catch (error) {
            console.error('Error during setup:', error);
            process.exit(1); 
        }
    })

    it('should delete the cat of an existing user', async function() {
        const deletedCatId = await catService.deleteCat(userId, catId);
        const deletedCat = await Cat.findById(catId);

        expect(deletedCat).to.be.null;
        expect(deletedCatId.toString()).to.equal(catId);
    });



    it('should throw a NotFoundError if the cat does not exist', async function() {
        try {
            await catService.deleteCat(userId, new mongoose.Types.ObjectId().toString())
        } catch (error) {

            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal('cat not found')
        }
    })

    it('should throw an InvalidObjectIdError if the userId is not a valid ObjectId', async function() {
        try {
            await catService.deleteCat('invalidObjectId', catId);
        } catch (error) {
            expect(error.message).to.equal('invalid ObjectId');
        }
    })

    it('should throw a SystemError for other unexpected errors', async function() {
        const originalValidateText = validate.text;
        validate.text = () => { throw new Error('unexpected error'); }

        try {
            await catService.deleteCat(userId, catId);
        } catch (error) {
            expect(error.message).to.equal('unexpected error');
        }

        validate.text = originalValidateText
    })

    after(async function() {
        await User.deleteMany({})
        await Cat.deleteMany({})
        await mongoose.disconnect()
    })
})
