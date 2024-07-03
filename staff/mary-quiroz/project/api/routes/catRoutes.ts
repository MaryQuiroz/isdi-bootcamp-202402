import { Router } from 'express'
import catController from '../controllers/catController'
import taskController from '../controllers/taskController'

const router = Router()

router.post('/',catController.createCat )
router.get('/', catController.retrieveCats)
router.delete('/:id',catController.deleteCat)
router.put('/:id', catController.updateCat)
router.post('/:id/tasks', taskController.createTask)
router.get('/:id/tasks', taskController.retrieveTasks)
router.get('/search', catController.searchCat)

export default router
