import { Router } from 'express'
import taskController from '../controllers/taskController'

const router = Router()

router.get('/', taskController.retrieveTasks)
router.put('/:id', taskController.updateTask)
router.delete('/:id', taskController.deleteTask)

export default router
