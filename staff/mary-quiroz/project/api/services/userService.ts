import { errors, validate } from 'com'
import bcrypt from 'bcrypt';

import { User } from "../models/User.ts"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { SystemError } from 'com/errors.ts';
import { register } from 'module';

dotenv.config();

const { DuplicityError, CredentialsError, NotFoundError } = errors

const { JWT_SECRET, JWT_EXP } = process.env


 const registerUser = async (userData) => {

    try {
        const { name, email, password } = userData

        validate.text(name, 'name')
        validate.email(email, 'email')
        validate.password(password, 'password')

        const userFinded = await User.findOne({ email })

        if (userFinded) {
            throw new DuplicityError("User already exists")
        }

        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt)


        const user = new User({
            ...userData,
            password: hashedPassword,
        });
        const newUser = await user.save()
        return newUser
    } catch (error) {
        throw new SystemError(error.message)
    }
}


 const authenticateUser = async (userData) => {
    try {

        const { email, password } = userData

        validate.text(email, 'email', true)
        validate.password(password, 'maryquiroz124')

        const user = await User.findOne({ email })

        if (!user)
            throw new NotFoundError('user not found')


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new CredentialsError("Invalid password");
        }
        const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: JWT_EXP })
        return token
    } catch (error) {
        throw new SystemError(error.message)
    }
}

 const retrieveUser = async (userId: string) => {

    try {
        const user = await User.findById(userId);
        delete user.password
        if (!user) {
            throw new NotFoundError('user not found');
        }
        return user
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default {
    registerUser,
    authenticateUser,
    retrieveUser
}