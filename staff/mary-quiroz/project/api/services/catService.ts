import { errors, validate } from 'com'
import { Types } from "mongoose"


import { User } from "../models/User.ts"
import dotenv from 'dotenv'
import { Cat, ICat } from '../models/Cat.ts'

dotenv.config();

const { NotFoundError, InvalidObjectIdError, SystemError } = errors

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

export const createCatService = async (catData: CatParams): Promise<ICat> => {
  try {
    const { userId, name, color, breed, birthdate, avatar, description } = catData

    validate.text(userId, 'userId')
    validate.text(name, 'name')
    validate.text(color, 'color')
    validate.text(breed, 'breed')
    validate.text(avatar, 'avatar')
    validate.text(description, 'description')


    const user = await User.findById(new Types.ObjectId(userId))
    if (!user) {
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
    const newCat = await cat.save()
    return newCat
  } catch (error) {
    throw new SystemError(error.message)
  }
}

export const retrieveCatsService = async (userId: string): Promise<ICat[]> => {

  try {
    validate.text(userId, 'userId');

    const user = await User.findById(new Types.ObjectId(userId))
    if (!user) throw new NotFoundError('user not found')
    const cats = await Cat.find({ user: userId })
    if (!cats) throw new NotFoundError('cat not found')
    return cats
  } catch (error) {
    throw new SystemError(error.message)
  }

}

export const retrieveCatService = async (userId: string, catId:string): Promise<ICat> => {

  try {
    validate.text(userId, 'userId');

    const user = await User.findById(userId)
    if (!user) throw new NotFoundError('user not found')
    const cat = await Cat.findOne({ user: userId, _id:catId })
    if (!cat) throw new NotFoundError('cat not found')
    return cat
  } catch (error) {
    throw new SystemError(error.message)
  }

}


export const deleteCatService = async (userId: string, catId: string): Promise<string> => {

  try {
    validate.text(catId, 'catId')
    validate.text(userId, 'userId')

    if (!Types.ObjectId.isValid(userId)) throw new InvalidObjectIdError('invalid ObjectId')

    const user = await User.findById(userId)
    if (!user) throw new NotFoundError('user not found')

    const catDeleted = await Cat.findByIdAndDelete(catId)
    if (!catDeleted) throw new NotFoundError('cat not found')

    return catDeleted._id
  } catch (error) {
    if(error instanceof  InvalidObjectIdError) throw new InvalidObjectIdError(error.message)
    if(error instanceof  NotFoundError) throw new NotFoundError(error.message)
    throw new SystemError(error.message)

  }
}

export const updateCatService = async (userId: string, catId: string, catData: any): Promise<ICat> => {
  try {
    validate.text(catId, 'catId')
    validate.text(userId, 'userId')

    if (!Types.ObjectId.isValid(userId)) throw new InvalidObjectIdError('Invalid ObjectId')

    const user = await User.findById(userId)
    if (!user) throw new NotFoundError('user not found')

    const updatedCat = await Cat.findByIdAndUpdate(catId, catData, { new: true })
    if (!updatedCat) throw new NotFoundError('cat not found')

    return updatedCat
  } catch (error) {
    throw new SystemError(error.message)

  }
}

export const searchCatsService = async (userId: string, searchObject: any): Promise<ICat[]> => {
  try {
    validate.text(userId, 'userId');
    const user = await User.findById(userId)
    if (!user) throw new NotFoundError('user not found')

    const modifiedSearchObject = { user: new Types.ObjectId(userId), name: { $regex: `^${searchObject.name}`, $options: 'i' } };


    const cats = await Cat.find(modifiedSearchObject)
    if (!cats) throw new NotFoundError('cat not found')
    return cats
  } catch (error) {
    throw new SystemError(error.message)
  }

}

