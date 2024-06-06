import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { authenticateUserService, registerUserService, retrieveUserService } from '../services/userService.ts'
dotenv.config()


const { JWT_SECRET } = process.env


export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await registerUserService(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }

}

export const authenticateUserController = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const token = await authenticateUserService(req.body)
    res.status(200).json(token)
  } catch (error) {
    next(error)
  }
}

export const retrieveUserController = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    const user = await retrieveUserService(userId.toString())

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

