import { validate, errors } from 'com'
import { Cat } from '../../models/Cat.ts'
import { User } from '../../models/User.ts'

const { NotFoundError, SystemError } = errors

async function deleteCat(userId: string, catId: string): Promise<void> {
    validate.text(userId, 'userId', true)
    validate.text(catId, 'catId', true)

    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new NotFoundError('user not found')
        }

        const cat = await Cat.findOneAndDelete({ _id: catId, user: userId })
        if (!cat) {
            throw new NotFoundError('cat not found')
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        } else {
            throw new SystemError(error.message)
        }
    }
}

export default deleteCat
