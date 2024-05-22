import { Schema } from 'mongoose'

const { Types: { ObjectId } } = Schema


import { validate, errors } from 'com'
import { User } from '../../models/User.ts'
import { Cat, ICat } from '../../models/Cat.ts'

const { NotFoundError, SystemError } = errors

async function retrieveCat(userId:string, catId: string): Promise<ICat> {
    validate.text(catId, 'catId', true)

try {
    const user = await User.findById(userId)
    if(!user) throw new NotFoundError('user not found')
    const cat = await Cat.findById(catId)
    if(!cat) throw new NotFoundError('cat not found')
    return cat



} catch (error) {
    throw new SystemError(error.message)
}

}

export default retrieveCat