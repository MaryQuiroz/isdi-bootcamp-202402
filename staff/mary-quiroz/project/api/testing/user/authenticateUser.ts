import { validate, errors } from 'com'
import { User } from '../../models/User.ts'
import bcrypt from 'bcrypt';

const { SystemError, CredentialsError, NotFoundError } = errors


async function authenticateUser(email: string, password: string): Promise<string> {
    validate.text(email, 'email', true)
    validate.password(password)

    try {
        const userFinded = await User.findOne({ email })
        if (!userFinded)
            throw new NotFoundError('user not found')

        if (userFinded.password !== password)
            throw new CredentialsError('wrong password')


        const isPasswordValid = await bcrypt.compare(password, userFinded.password);
        if (!isPasswordValid) {
            throw new CredentialsError("Invalid password");
        }
        return userFinded._id.toString()

    } catch (error) {
        if (error instanceof NotFoundError || error instanceof CredentialsError) {
            throw error
        } else {
            throw new SystemError(error.message)
        }
    }
}

export default authenticateUser
