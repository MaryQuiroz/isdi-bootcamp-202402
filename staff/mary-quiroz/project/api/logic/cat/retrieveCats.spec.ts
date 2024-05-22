import { expect } from 'chai'
import mongoose from 'mongoose'
import retrieveCats from './retrieveCats.ts'
import {errors} from 'com';
import { User } from '../../models/User.ts'
import { Cat } from '../../models/Cat.ts'
const {NotFoundError} = errors

describe('retrieveCats', function() {
    before(async function() {
        await mongoose.connect(process.env.MONGODB_TEST_URL);

        await User.deleteMany()
        await Cat.deleteMany()

        const user = new User({ name: 'Test User', email: 'test@test.com', password: 'test123' });
        await user.save();

        const cat1 = new Cat({ name: 'Gato 1', user: user._id })
        const cat2 = new Cat({ name: 'Gato 2', user: user._id })
        await cat1.save()
        await cat2.save()
    });

    it('should retrieve all the cats of an existing user', async function() {
        const user = await User.findOne({ email: 'test@test.com' })
        const cats = await retrieveCats(user._id.toString())

        expect(cats).to.be.an('array').that.is.not.empty;
        expect(cats.length).to.equal(2)
        cats.forEach(cat => {
            expect(cat).to.have.property('name')
            expect(cat.user.toString()).to.equal(user._id.toString())
        });
    });

    it('should throw a NotFoundError if the user does not exist', async function() {
        try {
            await retrieveCats(new mongoose.Types.ObjectId().toString())
        } catch (error) {
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    });

    after(async function() {
        // Eliminar los datos de prueba y desconectar de la base de datos después de todas las pruebas
        await User.deleteMany({});
        await Cat.deleteMany({});
        await mongoose.disconnect();
    });
});
