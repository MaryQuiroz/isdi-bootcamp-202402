import { Router } from 'express'
import { createCatController, deleteCatController, retrieveCatsController, searchCatController, updateCatController } from '../controllers/catController'
import { createTaskController, retrieveTasksController } from '../controllers/taskControlle'

const router = Router()

router.post('/', createCatController)
router.get('/', retrieveCatsController)
router.delete('/:id', deleteCatController)
router.put('/:id', updateCatController)
router.post('/:id/tasks', createTaskController)
router.get('/:id/tasks', retrieveTasksController)
router.get('/search', searchCatController)

export default router
