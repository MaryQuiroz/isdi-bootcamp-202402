import { Schema } from 'mongoose'

const { Types: { ObjectId } } = Schema

import { CatType, Cat } from '../data/index.ts'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

function updateCat(catId: string, cat: object ): Promise<CatType> {
    // validate.text(catId, 'catId', true)
    // validate.text(cat, 'updatedCatData', true)

    const filter = { _id: catId};
    const update = cat;

    return Cat.findOneAndUpdate(filter,update, {
        new: true
      })
   
    .then(updatedCat => {
        if(!updatedCat) throw new NotFoundError('cat not found')

        return updatedCat
    })
    .catch(error => { throw new SystemError(error.message) })

}

export default updateCat