import { Router } from 'express'
import { retrieveTasksController, updateTaskController, deleteTaskController } from '../controllers/taskControlle'

const router = Router()

router.get('/', retrieveTasksController)
router.put('/:id', updateTaskController)
router.delete('/:id', deleteTaskController)

export default router
