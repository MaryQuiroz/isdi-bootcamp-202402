import { errors, validate } from 'com'
import {  Types } from "mongoose"


import { User } from "../models/User.ts"
import dotenv from 'dotenv'
import { Cat, ICat } from '../models/Cat.ts'
import { logger } from '../utils/index.ts'
import { InvalidObjectIdError } from 'com/errors.ts'

dotenv.config();

const {  NotFoundError } = errors

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
  logger.info(catData)
  const { userId, name, color, breed, birthdate, avatar, description } = catData

  validate.text(userId, 'userId')
  validate.text(name, 'name')
  validate.text(color, 'color')
  validate.text(breed, 'breed')
  validate.text(avatar, 'avatar')
  validate.text(description, 'description')


  const user = await User.findById(new Types.ObjectId(userId))
  if(!user) {
    throw new NotFoundError('user not found')
  }

  const cat: ICat = new Cat ({
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
}

export const retrieveCatsService = async (userId: string): Promise<ICat[]> => {

  validate.text(userId, 'userId');

    const user = await User.findById(userId)
    if(!user) throw new NotFoundError('user not found')
    const cats = await Cat.find({user:userId})
    if(!cats) throw new NotFoundError('cat not found')
    return cats

}

export const deleteCatService = async (userId:string, catId:string) : Promise<string> => {

  validate.text(catId, 'catId')
  validate.text(userId, 'userId')

  if(!Types.ObjectId.isValid(userId)) throw new InvalidObjectIdError('invalid ObjectId')

  const user = await User.findById(userId)
  if(!user) throw new NotFoundError('user not found')

    const catDeleted = await Cat.findByIdAndDelete(catId)
    if(!catDeleted) throw new NotFoundError('cat not found')

    return catDeleted._id
}

export const updateCatService = async (userId:string, catId: string, catData: CatParams) : Promise<ICat> => {
  validate.text(catId, 'catId')
  validate.text(userId,'userId')

  if(!Types.ObjectId.isValid(userId)) throw new InvalidObjectIdError('Invalid ObjectId')

  const user = await User.findById(userId)
  if(!user) throw new NotFoundError('user not found')

  const updatedCat = await Cat.findByIdAndUpdate(catId, catData, {new:true})
  if(!updatedCat) throw new NotFoundError('cat not found')

    return updatedCat
}

