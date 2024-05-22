import { Request, Response } from 'express'
import { Task } from '../models/Task'
import { ContentError, NotFoundError, SystemError, UnauthorizedError } from 'com/errors'
import jwt from 'jsonwebtoken'
import createTask from '../logic/task/createTask'
import { logger } from '../utils'
import retrieveTasks from '../logic/task/retrieveTasks'
import updateTask from '../logic/task/updateTask.ts'
import deleteTask from '../logic/task/deleteTask.ts'

const { JWT_SECRET, JWT_EXP } = process.env

const { TokenExpiredError } = jwt


export const retrieveTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.taskId).populate('cat')
    if (!task) return res.status(404).json({ message: 'Task not found' })
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
        throw new ContentError('Authorization header is missing')
    }

    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    const { catId } = req.params
    const { title, description, priority, dueDate } = req.body

    try {
        const task = await createTask(catId, title, description, priority, new Date(dueDate))
        res.status(201).json(task)
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
export const retrieves = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
        throw new ContentError('Authorization header is missing')
    }

    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    const { catId } = req.params

    try {
        const tasks = await retrieveTasks(catId)
        res.status(200).json(tasks)
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
    const { taskId } = req.params
    logger.info(taskId)
    const task = await updateTask(taskId, req.body)
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

export const deleteT = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    await deleteTask(taskId);
    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};
