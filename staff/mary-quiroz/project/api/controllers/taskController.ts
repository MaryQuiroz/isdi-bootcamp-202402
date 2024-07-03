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

 const retrieveTasks = (req: Request, res: Response, next:NextFunction) => {
  
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const{ sub } = jwt.verify(token, JWT_SECRET)

    const catId = req.params.id
    return taskService.retrieveTasks(catId)
    .then(tasks => {
      res.status(200).json(tasks)

    })
    .catch(error => {
      next(error)

    }) 
}

 const updateTask = (req: Request, res: Response, next:NextFunction) => {
  
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    const taskId = req.params.id
    const taskData = req.body

    return taskService.updateTask(userId.toString(), taskId, taskData)

    .then(taskUpdated => {
      res.status(200).json(taskUpdated)

    })

    .catch(error => {
      next(error)

    }) 


}

 const deleteTask =  (req: Request, res: Response, next: NextFunction) => {
  
    const { authorization } = req.headers
    const token = authorization.slice(7)
    const { sub: userId } = jwt.verify(token, JWT_SECRET)

    const taskId = req.params.id

    return taskService.deleteTask(userId.toString(), taskId)

    .then(taskUpdated => {
      res.status(200).json(taskUpdated)

    })
    .catch (error => {
      next(error)

    }) 

}

export default {
  createTask,
  retrieveTasks,
  updateTask,
  deleteTask
}