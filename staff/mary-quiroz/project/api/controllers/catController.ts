import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { logger } from '../utils'

import catService from '../services/catService.ts'

const {  JWT_SECRET } = process.env


const createCat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers
      const token = authorization.slice(7)
      const { sub } = jwt.verify(token, JWT_SECRET)

      const userId = sub.toString()
      const catData = req.body


      const cat = await catService.createCat({...catData, userId})
      res.status(201).json(cat)
    } catch (error) {
        next(error)
    }
}

const retrieveCats = async (req: Request, res: Response, next:NextFunction) => {
    try {

        const { authorization } = req.headers
        const token = authorization.slice(7)
        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        const cats = await catService.retrieveCats(userId.toString())
        res.status(200).json(cats)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const deleteCat = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId} = jwt.verify(token, JWT_SECRET)

    const catId = req.params.id

    const catDeleted = await catService.deleteCat(userId.toString(), catId)
    res.status(200).json(catDeleted)

  } catch(error) {
    next(error)
  }
}

const updateCat = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    const catId = req.params.id
    const catData = req.body

    const catUpdated = await catService.updateCat(userId.toString(), catId, catData)
    res.status(200).json(catUpdated)
  } catch(error) {
    next(error)
  }
}
const searchCat = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    const value = req.query.name as string
    
    const cats = await catService.searchCats(userId.toString(), value)
    res.status(200).json(cats);
  } catch (error) {
    next(error)
  }

}

export default {
  createCat,
  retrieveCats,
  deleteCat,
  updateCat,
  searchCat
}
