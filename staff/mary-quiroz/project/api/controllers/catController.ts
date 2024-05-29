import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { logger } from '../utils'

import { createCatService, deleteCatService, retrieveCatsService, searchCatsService, updateCatService } from '../services/catService.ts'

const {  JWT_SECRET } = process.env


export const createCatController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers
      const token = authorization.slice(7)
      const { sub } = jwt.verify(token, JWT_SECRET)

      const userId = sub.toString()
      const catData = req.body


      const cat = await createCatService({...catData, userId})
      res.status(201).json(cat)
    } catch (error) {
        next(error)
    }
}

export const retrieveCatsController = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { authorization } = req.headers
        const token = authorization.slice(7)
        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        const cats = await retrieveCatsService(userId.toString())
        res.status(200).json(cats)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteCatController = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId} = jwt.verify(token, JWT_SECRET)

    const catId = req.params.id

    const catDeleted = await deleteCatService(userId.toString(), catId)
    res.status(200).json(catDeleted)

  } catch(error) {
    next(error)
  }
}

export const updateCatController = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    const catId = req.params.id
    const catData = req.body

    const catUpdated = await updateCatService(userId.toString(), catId, catData)
    res.status(200).json(catUpdated)
  } catch(error) {
    next(error)
  }
}
export const searchCatController = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    const searchObject = req.query
    const cats = await searchCatsService(userId.toString(), searchObject)
    res.status(200).json(cats);
  } catch (error) {
    next(error)
  }

}

