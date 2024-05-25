import { Router } from 'express'
import {  registerUserController,  retrieveUserController, authenticateUserController } from '../controllers/userControllers'

const router = Router()

router.post('/', registerUserController)
router.post('/auth', authenticateUserController)
router.get('/:targetUserId', retrieveUserController)

export default router