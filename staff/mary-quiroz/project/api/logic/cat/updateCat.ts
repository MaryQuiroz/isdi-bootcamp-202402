import { validate, errors } from 'com'
import { Cat, ICat } from '../../models/Cat.ts'
import { User } from '../../models/User.ts'

const { NotFoundError, SystemError } = errors

async function updateCat(userId: string, catId: string, updateData: Partial<ICat>): Promise<ICat> {
    validate.text(userId, 'userId', true)
    validate.text(catId, 'catId', true)

    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new NotFoundError('user not found')
        }

        const cat = await Cat.findOne({ _id: catId, user: userId })
        if (!cat) {
            throw new NotFoundError('cat not found')
        }

        Object.assign(cat, updateData)
        await cat.save()

        return cat
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        } else {
            throw new SystemError(error.message)
        }
    }
}

export default updateCat
