import { Router } from 'express'
import userController from '../controllers/userController'

const router = Router()

router.post('/', userController.registerUser)
router.post('/auth', userController.authenticateUser)
router.get('/:targetUserId', userController.retrieveUser)

export default router