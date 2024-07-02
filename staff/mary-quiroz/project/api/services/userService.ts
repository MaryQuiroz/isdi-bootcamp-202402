import { errors, validate } from 'com'
import bcrypt from 'bcrypt';

import { User } from "../models/User.ts"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { SystemError } from 'com/errors.ts';

dotenv.config();

const { DuplicityError, CredentialsError, NotFoundError } = errors

const { JWT_SECRET, JWT_EXP } = process.env

const registerUser = (userData) => {
    const { name, email, password } = userData

    validate.text(name, 'name')
    validate.email(email, 'email')
    validate.password(password, 'password')

    let userFinded

    return User.findOne({ email })
        .then((user) => {
            userFinded = user
            if (userFinded) {
                throw new DuplicityError("User already exists")
            }
            return bcrypt.genSalt(10)
        })
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
            const user = new User({
                ...userData,
                password: hashedPassword,
            })
            return user.save()
        })
        .then((newUser) => newUser)
        .catch((error) => {
            if (error instanceof DuplicityError || error.name === 'MongoError') {
                throw error 
            }
            throw new SystemError(error.message) 
        })
}


 const authenticateUser = (userData) => {

        const { email, password } = userData

        validate.text(email, 'email', true)
        validate.password(password, 'maryquiroz124')

        return User.findOne({ email })
        .catch(error => { throw new SystemError(error.message)})
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')
            const isPasswordValid = bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                throw new CredentialsError("Invalid password");
            }
        
        const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: JWT_EXP })
        return token
        })    
}
    const retrieveUser = (userId: string) => {

        validate.text(userId, 'userId', true)
        
        return User.findById(userId)
        
        .catch(error => { throw new SystemError(error.message)})
        .then(user => {
            delete user.password
            if (!user) throw new NotFoundError('user not found')
                return user
        })
    }


export default {
    registerUser,
    authenticateUser,
    retrieveUser
}