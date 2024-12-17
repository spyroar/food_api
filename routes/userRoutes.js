const express=require('express')
const { userController, updateUserController } = require('../controllers/userController');
const { authMiddeleware } = require('../middelewares/authMiddeleware');
const router=express.Router()

// routes  GET USER ||GET METHOD

router.get('/getUser',authMiddeleware,userController)
// UPDATE 
router.put('/updateuser',authMiddeleware,updateUserController)

module.exports=router