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


// export const retrieve = async (req: Request, res: Response) => {
//   try {
//     const token = await retrieveUserService()
//     res.status(200).json(token)
//   } catch (error) {
//     res.status(500).json({ error: error.constructor.name, message: error.message })
//   }
// }


export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}



export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    if (!updatedUser) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId)
    if (!deletedUser) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
