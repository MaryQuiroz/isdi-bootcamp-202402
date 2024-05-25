import { errors, validate } from 'com'
import bcrypt from 'bcrypt';

import { User } from "../models/User.ts"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { DuplicityError,  CredentialsError, NotFoundError } = errors

const { MONGODB_URL, PORT, JWT_SECRET, JWT_EXP } = process.env


export const registerUserService = async (userData) => {

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
}


export const  authenticateUserService = async(userData) =>{

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
    const token = jwt.sign({ sub: user._id }, JWT_SECRET, { expiresIn: JWT_EXP })
    return token    
}

export const retrieveUserService = async(userId:string)=>{

  const user = await User.findById(userId);
  delete user.password
  if (!user) {
      throw new NotFoundError('user not found');
  }
  return user
}
