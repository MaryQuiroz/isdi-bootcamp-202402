import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userService from '../services/userService.ts'
dotenv.config()


const { JWT_SECRET } = process.env


 const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.registerUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }

}

 const authenticateUser = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const token = await userService.authenticateUser(req.body)
    res.status(200).json(token)
  } catch (error) {
    next(error)
  }
}

 const retrieveUser = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    const user = await userService.retrieveUser(userId.toString())

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export default {
  registerUser,
  authenticateUser,
  retrieveUser
}

