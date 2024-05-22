import { Router } from 'express';
import { retrieves, retrieveTask, create, update, deleteT } from '../controllers/taskController'

const router = Router()

router.post('/:catId', create)
router.get('/:taskId', retrieveTask)
router.get('/cat/:catId', retrieves)
router.patch('/:taskId', update)
router.delete('/:taskId', deleteT)

export default router
