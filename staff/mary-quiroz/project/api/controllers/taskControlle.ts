import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { createTaskService, deleteTaskService, retrieveTasksService, updateTaskService } from '../services/taskService.ts'

const { JWT_SECRET, JWT_EXP } = process.env



export const createTaskController = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub : userId} = jwt.verify(token, JWT_SECRET)
    const catId = req.params.id
    const taskData =req.body
    const cat = await createTaskService(userId, catId, taskData )
    res.status(201).json(cat)
  } catch (error) {
    next(error)
  }
}

export const retrieveTasksController = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const{ sub } = jwt.verify(token, JWT_SECRET)

    const catId = req.params.id
    const tasks = await retrieveTasksService(catId)
    res.status(200).json(tasks)
  } catch(error) {
    next(error)
  }
}

export const updateTaskController = async (req: Request, res: Response, next:NextFunction) => {

  try{
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    const taskId = req.params.id
    const taskData = req.body
    const taskUpdated = await updateTaskService(userId.toString(), taskId, taskData)
    res.status(200).json(taskUpdated);

  } catch(error) {
    next(error)
  }


}

export const deleteTaskController = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    const taskId = req.params.id
    const taskUpdated = await deleteTaskService(userId.toString(), taskId)
    res.status(200).json(taskUpdated);
  } catch (error) {
    next(error)

  }

}