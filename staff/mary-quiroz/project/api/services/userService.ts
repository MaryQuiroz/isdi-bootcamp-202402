import { errors, validate } from 'com'
import bcrypt from 'bcrypt';

import { User } from "../models/User.ts"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { DuplicityError, SystemError, CredentialsError, NotFoundError } = errors

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




// export const authenticateUserService = async (userData)=>{
//         const { email, password } = userData
    
//           const userId = await authenticateUser(email, password)
//           const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXP })
    
//           try {
//             const { email, password } = req.body
        
//             try {
//               const userId = await authenticateUser(email, password)
//               const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXP })
        
//               res.json(token)
//             } catch (error) {
//               if (error instanceof SystemError) {
//                 logger.error(error.message)
//                 res.status(500).json({ error: error.constructor.name, message: error.message })
//               } else if (error instanceof CredentialsError) {
//                 logger.warn(error.message)
//                 res.status(401).json({ error: error.constructor.name, message: error.message })
//               } else if (error instanceof NotFoundError) {
//                 logger.warn(error.message)
//                 res.status(404).json({ error: error.constructor.name, message: error.message })
//               }
//             }
//           } catch (error) {
//             if (error instanceof TypeError || error instanceof ContentError) {
//               logger.warn(error.message)
//               res.status(406).json({ error: error.constructor.name, message: error.message })
//             } else {
//               logger.warn(error.message)
//               res.status(500).json({ error: SystemError.name, message: error.message })
//             }
//           }
// }