import express from 'express'
import { userController } from '../controllers/userController.js'
import { protect } from '../middlewares/protect.js'


const router = express.Router()

router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.get('/logout',protect,userController.logout)
router.get('/getPasswords',protect,userController.getPasswords)
router.post('/savePassword',protect,userController.savePassword)
router.patch('/editPassword',protect,userController.editPassword)
router.delete('/deletePassword',protect,userController.deletePassword)

export default router