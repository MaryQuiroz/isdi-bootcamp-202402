import { Schema } from 'mongoose'

const { Types: { ObjectId } } = Schema

import { CatType, Cat } from '../data/index.ts'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

function retrieveCats(userId: string): Promise<CatType[]> {
    // validate.text(userId, 'userId', true)
    
    return Cat.find( { user: userId } )
    .sort({ _id: -1 }) 
    .then((cats: CatType[]) => {
        if(!cats) throw new NotFoundError('cat not found')

        return cats
    })
    .catch(error => { throw new SystemError(error.message) })

}

export default retrieveCats