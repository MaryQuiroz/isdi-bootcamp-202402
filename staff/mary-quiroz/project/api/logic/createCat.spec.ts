import dotenv from 'dotenv';
import { expect } from 'chai';
import { validate, errors } from 'com';
import mongoose from 'mongoose';
import { CatType, Cat } from '../data';
import createCat from './createCat';

dotenv.config();

const { SystemError } = errors;

describe('createCat', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL));

   

    after(() => mongoose.disconnect())
}) 