import { validate, errors } from 'com'
import { IUser, User } from '../../models/User.ts'


const { DuplicityError, SystemError } = errors

export async function registerUser(name: string, email: string, password: string): Promise<IUser> {
    validate.text(name, 'name')
    validate.email(email)
    validate.password(password)

    try {
        let user:IUser = await User.findOne({ email })
        if(user){
            throw new DuplicityError('user already exists')
        }
        user= {
            name: name.trim(),
            email: email,
            password: password
        } as IUser
        
        return User.create(user)

    } catch (error) {
        
        throw new SystemError(error.message)
    }
}

