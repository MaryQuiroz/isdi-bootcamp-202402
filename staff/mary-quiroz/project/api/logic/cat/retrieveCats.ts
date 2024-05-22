import { validate, errors } from 'com'
import { Cat, ICat } from '../../models/Cat.ts'
import { User } from '../../models/User.ts'


const { NotFoundError, SystemError } = errors

async function retrieveCats(userId: string): Promise<ICat[]> {
    validate.text(userId, 'userId', true)

    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new NotFoundError('user not found')
        }

        const cats = await Cat.find({ user: userId }).sort({ _id: -1 })
        if (!cats.length) {
            throw new NotFoundError('cat not found')
        }

        return cats
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        } else {
            throw new SystemError(error.message)
        }
    }
}

export default retrieveCats;