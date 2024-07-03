import { errors, validate } from 'com'
import { Types } from "mongoose"


import { User } from "../models/User.ts"
import dotenv from 'dotenv'
import { Cat, ICat } from '../models/Cat.ts'

dotenv.config();

const { NotFoundError, InvalidObjectIdError, SystemError, ValidatorError} = errors

const { MONGODB_URL, PORT, JWT_SECRET, JWT_EXP } = process.env


interface CatParams {
  userId: string
  name: string
  color: string
  breed: string
  birthdate: Date
  avatar: string
  description: string
}

const createCat = (catData: CatParams): Promise<ICat> => {

  const { userId, name, color, breed, birthdate, avatar, description } = catData

  validate.text(userId, 'userId')
  validate.text(name, 'name')
  validate.text(color, 'color')
  validate.text(breed, 'breed')
  validate.text(avatar, 'avatar')
  validate.text(description, 'description')

  return User.findById(new Types.ObjectId(userId))

    .then((user) => {
     if(!user) {
      throw new NotFoundError('user not found')
    }
      const cat: ICat = new Cat({
        name: name.trim(),
        color: color,
        breed: breed,
        birthdate: birthdate,
        avatar: avatar,
        description: description,
        user: new Types.ObjectId(userId)
      })

      return cat.save()
    })
    .then(newCat => {
      return newCat
    })

    .catch(error => {
      if (error instanceof ValidatorError) {
          throw new ValidatorError(error.message)
      } else {
          throw new SystemError(`Error creating task ${error.message}`)
      }
    })
    }


const retrieveCats = (userId: string): Promise<ICat[]> => {

    validate.text(userId, 'userId');

    return User.findById(new Types.ObjectId(userId))
    .then(user => {
      if (!user) throw new NotFoundError('user not found')

        return Cat.find({ user: userId }).sort({ createdAt: -1 })
    })
    .then(cats => {
      if (!cats) throw new NotFoundError('cat not found')
        return cats

    })
  .catch (error => {
    throw new SystemError(error.message)
  })

}

const retrieveCat =  (userId: string, catId: string): Promise<ICat> => {

    validate.text(userId, 'userId');

    return User.findById(userId)

    .then(user => {
      if (!user) throw new NotFoundError('user not found')
        
        return Cat.findOne({ user: userId, _id: catId })
    })
    .then(cat => {
      if (!cat) throw new NotFoundError('cat not found')

        return cat
    })
  .catch (error => {
    throw new SystemError(error.message)

  })

}


const deleteCat = (userId: string, catId: string): Promise<string> => {

    validate.text(catId, 'catId')
    validate.text(userId, 'userId')

    return User.findById(userId)
    .then(user => {

      if (!Types.ObjectId.isValid(userId)) throw new InvalidObjectIdError('invalid ObjectId')

        if (!user) throw new NotFoundError('user not found')
          return Cat.findByIdAndDelete(catId)
    })
    .then(catDeleted => {
      if (!catDeleted) throw new NotFoundError('cat not found')

        return catDeleted.id
    })

  .catch (error => {
    if (error instanceof InvalidObjectIdError) throw new InvalidObjectIdError(error.message)
    if (error instanceof NotFoundError) throw new NotFoundError(error.message)
    throw new SystemError(error.message)

  }) 
}

const updateCat = (userId: string, catId: string, catData: any): Promise<ICat> => {
  
    validate.text(catId, 'catId')
    validate.text(userId, 'userId')
    
    return User.findById(userId)
    .then(user => {

      if (!Types.ObjectId.isValid(userId)) throw new InvalidObjectIdError('Invalid ObjectId')
  
      if (!user) throw new NotFoundError('user not found')

        return Cat.findByIdAndUpdate(catId, catData, { new: true })
    })
  
      .then(updatedCat => {
        if (!updatedCat) throw new NotFoundError('cat not found')
          return updatedCat
      })

  .catch (error => {

    throw new SystemError(error.message)
  }) 

  
}

const searchCats = (userId: string, value: string): Promise<ICat[]> => {
  try {
    validate.text(userId, 'userId')
    return User.findById(userId)
    .then(user => {
      if (!user) throw new NotFoundError('user not found')

        const modifiedSearchObject = { user: new Types.ObjectId(userId), name: { $regex: `^${value}`, $options: 'i' } }

        return Cat.find(modifiedSearchObject)
    })
    .then(cats => {
      if (!cats) throw new NotFoundError('cat not found')

        return cats
    })

  } catch (error) {
    throw new SystemError(error.message)
  }

}

export default {
  createCat,
  retrieveCats,
  retrieveCat,
  deleteCat,
  updateCat,
  searchCats

}