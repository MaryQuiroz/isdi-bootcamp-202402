import { errors, validate } from 'com'
import {  Types } from "mongoose"


import { User } from "../models/User.ts"
import dotenv from 'dotenv'
import { Cat, ICat } from '../models/Cat.ts'
import { logger } from '../utils/index.ts'

dotenv.config();

const { DuplicityError, SystemError, CredentialsError, NotFoundError } = errors

const { MONGODB_URL, PORT, JWT_SECRET, JWT_EXP } = process.env


interface CreateCatParams {
  userId: string
  name: string
  color: string
  breed: string
  birthdate: Date
  avatar: string
  description: string
}

export const createCatService = async (catData: CreateCatParams): Promise<ICat> => {
  const { userId, name, color, breed, birthdate, avatar, description } = catData

  validate.text(userId, 'userId')
  validate.text(name, 'name')
  validate.text(color, 'color')
  validate.text(breed, 'breed')
  validate.text(avatar, 'avatar')
  validate.text(description, 'description')


  try {
    const user = await User.findById(new Types.ObjectId(userId));
    if (!user) {
      throw new NotFoundError("User not found");
    }
  } catch (error) {
    throw new SystemError(error.message);
  }

  const cat: ICat = new Cat({
    name: name.trim(),
    color: color,
    breed: breed,
    birthdate: birthdate,
    avatar: avatar,
    description: description,
    user: new Types.ObjectId(userId)
  });

  try {
    const newCat = await cat.save();
    return newCat;
  } catch (error) {
    throw new SystemError(error.message);
  }
};



export const retrieveCatsService = async (userId: string): Promise<ICat[]> => {

  validate.text(userId, 'userId');

    const user = await User.findById(userId)
    if(!user) throw new NotFoundError('user not found')
    const cats = await Cat.find({user:userId})
    if(!cats) throw new NotFoundError('cat not found')
    return cats

};

