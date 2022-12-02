const router=require("express").Router()
const userController=require('../controllers/userController')
const auth =require('../middleware/Authentification')
router.post('/signup' , userController.signup); 
 router.post('/login', userController.login) ; 
 router.get('/getuser/:id',auth , userController.getuser) ; 
 router.get('/get',auth , userController.getall) ; 

module.exports=router ;     