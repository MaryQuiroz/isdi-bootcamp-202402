import { Router } from 'express'
import { retrieveTasksController, updateTaskController } from '../controllers/taskControlle'

const router = Router()

router.get('/', retrieveTasksController)
router.put('/:id', updateTaskController)
export default router
