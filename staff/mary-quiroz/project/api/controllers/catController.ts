import { NextFunction, Request, Response } from 'express'
import { Cat, ICat } from '../models/Cat'
import jwt from 'jsonwebtoken'
import { errors } from 'com'
import createCat from '../logic/cat/createCat.ts'
import { logger } from '../utils'
import retrieveCat from '../logic/cat/retrieveCat.ts'
import retrieveCats from '../logic/cat/retrieveCats.ts'
import updateCat from '../logic/cat/updateCat.ts'
import deleteCat from '../logic/cat/deleteCat.ts'
import { createCatService, retrieveCatsService } from '../services/catService.ts'

const { TokenExpiredError } = jwt

const { MONGO_URL, PORT, JWT_EXP } = process.env
const {
    ContentError,
  SystemError,
  DuplicityError,
  NotFoundError,
  CredentialsError,
  UnauthorizedError
} = errors

export const createCatController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createCatService(req.body)
        res.status(201).json(user)
    } catch (error) {
        next()
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
        next()
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const { authorization } = req.headers

        if(!authorization) {
            throw new Error('Authorization header is missing')

        }

        const token = authorization.split('')[1]

        const {sub: userId } = jwt.verify(token, JWT_SECRET)

        const { name, color, breed, birthdate, avatar, description }: ICat = req.body
        
        try {
            const cat = await createCat(userId.toString(), name, color, breed, birthdate, avatar, description)
            res.status(201).json(cat)
        } catch (error) {
            if(error instanceof SystemError) {
                logger.error(error.message)
                res.status(500). json({ error: error. constructor.name, message: error.message })
            } else if(error instanceof NotFoundError) {
                logger.warm(error.message)
                res.status(404).json({ error: error.constructor.name, message: error.message})
            }
        }
    } catch (error) {
        if (error instanceof TypeError || error instanceof ContentError) {
            logger.warn(error.message)
            res.status(406).json({ error: error.constructor.name, message: error.message })
          } else if (error instanceof TokenExpiredError) {
            logger.warn(error.message)
            res.status(498).json({ error: UnauthorizedError.name, message: 'session expired' })
          } else {
            logger.warn(error.message)
            res.status(500).json({ error: SystemError.name, message: error.message })
          }
    }
}

export const retrieve = async (req: Request, res: Response) => {
    try {
      const { authorization } = req.headers
  
      const token = authorization.slice(7)
  
      const { sub: userId } = jwt.verify(token, JWT_SECRET)
  
      const { catId } = req.params
  
      retrieveCat(userId as string, catId as string)
        .then(cat => res.json(cat))
        .catch(error => {
          if (error instanceof SystemError) {
            logger.error(error.message)
  
            res.status(500).json({ error: error.constructor.name, message: error.message })
          } else if (error instanceof NotFoundError) {
            logger.warn(error.message)
  
            res.status(404).json({ error: error.constructor.name, message: error.message })
          }
        })
    } catch (error) {
      if (error instanceof TypeError || error instanceof ContentError) {
        logger.warn(error.message)
  
        res.status(406).json({ error: error.constructor.name, message: error.message })
      } else if (error instanceof TokenExpiredError) {
        logger.warn(error.message)
  
        res.status(498).json({ error: UnauthorizedError.name, message: 'session expired' })
      } else {
        logger.warn(error.message)
  
        res.status(500).json({ error: SystemError.name, message: error.message })
      }
    }
  }

  export const retrieves = async (req: Request, res: Response) => {
    try {
      const { authorization } = req.headers
  
      if (!authorization) {
        throw new Error('Authorization header is missing')
      }
  
      const token = authorization.slice(7)
      const { sub: userId } = jwt.verify(token, JWT_SECRET)
  
      try {
        const cats = await retrieveCats(userId as string)
        res.json(cats)
      } catch (error) {
        if (error instanceof SystemError) {
          logger.error(error.message)
          res.status(500).json({ error: error.constructor.name, message: error.message })
        } else if (error instanceof NotFoundError) {
          logger.warn(error.message)
          res.status(404).json({ error: error.constructor.name, message: error.message })
        } else {
          logger.error('Unexpected error:', error)
          res.status(500).json({ error: 'UnexpectedError', message: 'An unexpected error occurred' })
        }
      }
    } catch (error) {
      if (error instanceof TypeError || error instanceof ContentError) {
        logger.warn(error.message)
        res.status(406).json({ error: error.constructor.name, message: error.message })
      } else if (error instanceof TokenExpiredError) {
        logger.warn(error.message)
        res.status(498).json({ error: UnauthorizedError.name, message: 'session expired' })
      } else {
        logger.error('Unexpected error:', error)
        res.status(500).json({ error: 'UnexpectedError', message: 'An unexpected error occurred' })
      }
    }
  
  }

  export const update = async (req: Request, res: Response) => {
    try {
      const { authorization } = req.headers
      if (!authorization) {
          throw new ContentError('Authorization header is missing')
      }
  
      const token = authorization.slice(7)
      const { sub: userId } = jwt.verify(token, JWT_SECRET)
  
      const { catId } = req.params
      const updateData = req.body
  
      try {
          const updatedCat = await updateCat(userId.toString(), catId, updateData)
          res.json(updatedCat)
      } catch (error) {
          if (error instanceof SystemError) {
              logger.error(error.message)
              res.status(500).json({ error: error.constructor.name, message: error.message })
          } else if (error instanceof NotFoundError) {
              logger.warn(error.message)
              res.status(404).json({ error: error.constructor.name, message: error.message })
          } else {
              logger.error('Unexpected error:', error)
              res.status(500).json({ error: 'UnexpectedError', message: 'An unexpected error occurred' })
          }
      }
  } catch (error) {
      if (error instanceof TypeError || error instanceof ContentError) {
          logger.warn(error.message)
          res.status(406).json({ error: error.constructor.name, message: error.message })
      } else if (error instanceof TokenExpiredError) {
          logger.warn(error.message)
          res.status(498).json({ error: UnauthorizedError.name, message: 'session expired' })
      } else {
          logger.error('Unexpected error:', error)
          res.status(500).json({ error: 'UnexpectedError', message: 'An unexpected error occurred' })
      }
  }
  }
  
  export const deleteC = async (req: Request, res: Response) => {
    try {
      const { authorization } = req.headers
      if (!authorization) {
          throw new ContentError('Authorization header is missing')
      }
  
      const token = authorization.slice(7)
      const { sub: userId } = jwt.verify(token, JWT_SECRET)
  
      const { catId } = req.params
  
      try {
          await deleteCat(userId.toString(), catId)
          res.status(204).send()
      } catch (error) {
          if (error instanceof SystemError) {
              logger.error(error.message)
              res.status(500).json({ error: error.constructor.name, message: error.message })
          } else if (error instanceof NotFoundError) {
              logger.warn(error.message)
              res.status(404).json({ error: error.constructor.name, message: error.message })
          } else {
              logger.error('Unexpected error:', error)
              res.status(500).json({ error: 'UnexpectedError', message: 'An unexpected error occurred' })
          }
      }
  } catch (error) {
      if (error instanceof TypeError || error instanceof ContentError) {
          logger.warn(error.message)
          res.status(406).json({ error: error.constructor.name, message: error.message })
      } else if (error instanceof TokenExpiredError) {
          logger.warn(error.message)
          res.status(498).json({ error: UnauthorizedError.name, message: 'session expired' })
      } else {
          logger.error('Unexpected error:', error)
          res.status(500).json({ error: 'UnexpectedError', message: 'An unexpected error occurred' })
      }
  }
  }
  
  
