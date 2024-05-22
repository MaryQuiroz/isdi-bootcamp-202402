import { Router } from 'express'
import {  registerUserController, updateUser, deleteUser, retrieveUserController, authenticateUserController } from '../controllers/userControllers'

const router = Router()

router.post('/', registerUserController)
router.post('/auth', authenticateUserController)
router.get('/:targetUserId', retrieveUserController)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router