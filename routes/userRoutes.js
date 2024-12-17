const express=require('express')
const { userController } = require('../controllers/userController');
const router=express.Router()

// routes  GET USER ||GET METHOD

router.get('/getUser',userController)

module.exports=router