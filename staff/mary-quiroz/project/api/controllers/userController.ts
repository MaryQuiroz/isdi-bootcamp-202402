import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userService from '../services/userService.ts'
dotenv.config()


const { JWT_SECRET } = process.env

  const registerUser = (req: Request, res: Response, next: NextFunction) => {
    userService.registerUser(req.body)
    .then(user => {
      res.status(201).json(user)
  })
  .catch(error => {
    next(error)
  })
  }

 

const authenticateUser = (req: Request, res: Response, next:NextFunction) => {
  userService.authenticateUser(req.body)
   .then(token => {
    res.status(200).json(token)
   })
   .catch(error => {
    next(error)
   })
   
}

const retrieveUser = (req: Request, res: Response, next:NextFunction) => {
  const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

  userService.retrieveUser(userId.toString())
  .then(user => {
    res.status(200).json(user)
    
  })

  .catch(error => {
    next(error)
   })
  }
   

export default {
  registerUser,
  authenticateUser,
  retrieveUser
}