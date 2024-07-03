import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import taskService from '../services/taskService.ts'
import { logger } from '../utils/index.ts'

const { JWT_SECRET } = process.env



const createTask = (req: Request, res: Response, next:NextFunction) => {
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub : userId} = jwt.verify(token, JWT_SECRET)
    const catId = req.params.id
    const taskData =req.body

    taskService.createTask(userId.toString(), catId, taskData)
    
    .then(task => {
      res.status(201).json(task)
    })

    .catch(error => {
      next(error)
    })
    
}
/*const createTask = async (req: Request, res: Response, next:NextFunction) => {
  logger.info("Create Task")
  try {
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub : userId} = jwt.verify(token, JWT_SECRET)
    const catId = req.params.id
    
    const taskData =req.body
    const cat = await taskService.createTask(userId.toString(), catId, taskData )
    res.status(201).json(cat)
  } catch (error) {
    next(error)
  }
}
  */

 const retrieveTasks = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const{ sub } = jwt.verify(token, JWT_SECRET)

    const catId = req.params.id
    const tasks = await taskService.retrieveTasks(catId)
    res.status(200).json(tasks)
  } catch(error) {
    next(error)
  }
}

 const updateTask = async (req: Request, res: Response, next:NextFunction) => {
  try{
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    const taskId = req.params.id
    const taskData = req.body
    const taskUpdated = await taskService.updateTask(userId.toString(), taskId, taskData)
    res.status(200).json(taskUpdated)

  } catch(error) {
    next(error)
  }


}

 const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    const taskId = req.params.id
    const taskUpdated = await taskService.deleteTask(userId.toString(), taskId)
    res.status(200).json(taskUpdated);
  } catch (error) {
    next(error)

  }

}

export default {
  createTask,
  retrieveTasks,
  updateTask,
  deleteTask
}