import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import logic from './logic/index.ts'
import { errors } from 'com'
import tracer from 'tracer'
import colors from 'colors'
import jwt from 'jsonwebtoken'
import cors from 'cors'

dotenv.config()

const { TokenExpiredError } = jwt

const { MONGODB_URL, PORT, JWT_SECRET, JWT_EXP } = process.env
const logger = tracer.colorConsole({
    filters: {
        debug: colors.green,
        info: colors.blue,
        warn: colors.yellow,
        error: colors.red
    }
})

const {
    ContentError,
    SystemError,
    DuplicityError,
    NotFoundError,
    CredentialsError,
    UnauthorizedError
} = errors


mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = express.json()

        api.use(cors())

        api.post('/users', jsonBodyParser, (req, res) => {
            try {
                const { name, email, password } = req.body

                logic.registerUser(name, email, password)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof DuplicityError) {
                            logger.warn(error.message)

                            res.status(409).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { email, password } = req.body

                logic.authenticateUser(email, password)
                    .then(userId => {
                        const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXP })

                        res.json(token)
                    })
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof CredentialsError) {
                            logger.warn(error.message)

                            res.status(401).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.get('/users/:targetUserId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { targetUserId } = req.params

                logic.retrieveUser(userId as string, targetUserId)
                    .then(user => res.json(user))
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
        })

    //    CATS
    api.post('/cats/create',jsonBodyParser, (req, res) => {
        
        try {
            const { authorization } = req.headers
            logger.info(authorization)

            const token = authorization.split(' ')[1]

            const { sub: userId } = jwt.verify(token, JWT_SECRET)



            
            const {name, color, breed, age, avatar, description} = req.body

            logic.createCat(userId.toString(), name, color, breed, age, avatar, description)
            .then(cat => res.status(201).json(cat))
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
    })
    api.get('/cats/:targetCatId', (req, res) => {
        try {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            const { sub: catId } = jwt.verify(token, JWT_SECRET)

            const { targetCatId } = req.params

            logic.retrieveCat(catId as string, targetCatId)
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
    })
    api.get('/cats', (req, res) => {
        try {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            const { sub: userId } = jwt.verify(token, JWT_SECRET)


            logic.retrieveCats(userId as string)
                .then(cats => res.json(cats))
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
    })


    api.delete('/cats/:catId', (req, res) => {
        try {
            const { catId } = req.params

            logic.deleteCat(catId)
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
    })
        api.listen(PORT, () => logger.info(`API listening on port ${PORT}`))
    })
    .catch(error => logger.error(error))