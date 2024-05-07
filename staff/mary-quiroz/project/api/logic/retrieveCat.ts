import { Schema } from 'mongoose'

const { Types: { ObjectId } } = Schema

import { CatType, Cat } from '../data/index.ts'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

function retrieveCat(catId: string, targetCatId: string): Promise<{ name: string, color: string, breed: string, birthdate: Date, avatar: string }> {
    // validate.text(catId, 'catId', true)
    // validate.text(targetCatId, 'targetCatId', true)

    return Cat.findById(catId)
    .catch(error => { throw new SystemError(error.message) })
    .then(cat => {
        if(!cat) throw new NotFoundError('cat not found')

        return Cat.findById(targetCatId).lean()
    })
    .then(cat => {
        if(!cat) throw new NotFoundError('target cat not found')
            delete cat.name
            return cat
    })

}

export default retrieveCat