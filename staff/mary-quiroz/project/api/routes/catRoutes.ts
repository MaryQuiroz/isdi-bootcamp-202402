import { Router } from 'express'
import { createCatController, retrieve, retrieveCatsController } from '../controllers/catController'

const router = Router()

router.post('/', createCatController)
router.get('/', retrieveCatsController)
// router.get('/:catId', retrieve)
// router.put('/:catId', update)
// router.delete('/:catId', deleteC)

export default router
