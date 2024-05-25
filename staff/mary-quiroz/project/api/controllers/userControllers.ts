import { NextFunction, Request, Response } from 'express'
import authenticateUser from '../logic/user/authenticateUser'
import { errors } from 'com'
import jwt from 'jsonwebtoken'
import { logger } from '../utils'
import dotenv from 'dotenv'
import { User } from '../models/User.ts'
import { authenticateUserService, registerUserService, retrieveUserService } from '../services/userService.ts'
dotenv.config()


const { JWT_SECRET, JWT_EXP } = process.env


const { TokenExpiredError } = jwt


export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
  logger.info("Register user")
  try {
    const user = await registerUserService(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }

}

export const authenticateUserController = async (req: Request, res: Response, next:NextFunction) => {
  logger.info("Authenticate user")

  try {
    const token = await authenticateUserService(req.body)
    res.status(200).json(token)
  } catch (error) {
    next(error)
  }
}

export const retrieveUserController = async (req: Request, res: Response, next:NextFunction) => {
  logger.info("retrieve user")
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

