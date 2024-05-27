import { errors, validate } from 'com'
import bcrypt from 'bcrypt';

import { User } from "../models/User.ts"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { SystemError } from 'com/errors.ts';

dotenv.config();

const { DuplicityError, CredentialsError, NotFoundError } = errors

const { MONGODB_URL, PORT, JWT_SECRET, JWT_EXP } = process.env


export const registerUserService = async (userData) => {

    try {
        const { name, email, password } = userData

        validate.text(name, 'name')
        validate.email(email, 'mary@google.com')
        validate.password(password, 'maryquiroz124')

        const userFinded = await User.findOne({ email })

        if (userFinded) {
            throw new DuplicityError("User already exists")
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);


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


export const authenticateUserService = async (userData) => {
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

export const retrieveUserService = async (userId: string) => {

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
