import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { logger } from '../utils'

import catService from '../services/catService.ts'

const {  JWT_SECRET } = process.env


const createCat = (req: Request, res: Response, next: NextFunction) => {
    
      const { authorization } = req.headers
      const token = authorization.slice(7)
      const { sub } = jwt.verify(token, JWT_SECRET)

      const userId = sub.toString()
      const catData = req.body


      return catService.createCat({...catData, userId})
      .then(cat => {
        res.status(201).json(cat)
      })
      .catch (error => {
        next(error)
      }) 
    }

const retrieveCats =  (req: Request, res: Response, next:NextFunction) => {
        const { authorization } = req.headers
        const token = authorization.slice(7)
        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        catService.retrieveCats(userId.toString())
        .then(cats => {
          res.status(200).json(cats)

        })
      .catch (error => {
        next(error)
    })
}

const deleteCat = (req:Request, res: Response, next: NextFunction) => {
 
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId} = jwt.verify(token, JWT_SECRET)

    const catId = req.params.id

    catService.deleteCat(userId.toString(), catId)
    .then(catDeleted => {
      res.status(200).json(catDeleted)

    })

  .catch(error => {
    next(error)
  })
}

const updateCat = (req: Request, res: Response, next:NextFunction) => {
  
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    const catId = req.params.id
    const catData = req.body

    catService.updateCat(userId.toString(), catId, catData)
    .then(catUpdated => {
      res.status(200).json(catUpdated)

    })
   
  .catch(error => {
    next(error)
  }) 
  
}
const searchCat =  (req: Request, res: Response, next:NextFunction) => {

    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    const value = req.query.name as string
    
    catService.searchCats(userId.toString(), value)

    .then(cats => {
      res.status(200).json(cats)

    })
    .catch(error => {
      next(error)
    }) 

}

export default {
  createCat,
  retrieveCats,
  deleteCat,
  updateCat,
  searchCat
}
