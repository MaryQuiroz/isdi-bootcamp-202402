import { Schema } from 'mongoose'

const { Types: { ObjectId } } = Schema

import { CatType, Cat } from '../data/index.ts'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

function deleteCat(catId: string ): Promise<CatType> {
    validate.text(catId, 'catId', true)

    return Cat.findByIdAndDelete(catId)
   
    .then(cat => {
        if(!cat) throw new NotFoundError('cat not found')

        return cat._id
    })
    .catch(error => { throw new SystemError(error.message) })

}

export default deleteCat