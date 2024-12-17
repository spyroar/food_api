const usersModel = require("../models/usersModel")

const userController=async(req,res)=>{
  try {
    //  get user
        const getUser=await usersModel.findById({_id:req.body.id})
        // validate user
        if(!getUser){
            return res.status(500).json({
                success:false,
                message:"User not found",
            })
        }
//    hide password
   getUser.password=undefined
   return res.status(200).json({
         message:"user get successfully",
         success:true,
         user:getUser
   })
  } catch (error) {
      console.log(error)
    return res.status(500).json({
        success:false,
        message:"error in get User api",
        error:error.message
    })
  }

}


const updateUserController=async(req,res)=>{
      try {
                //  find user
                const user=await usersModel.findById({_id:req.body.id})
                if(!user){
                    return res.status(500).json({
                        success:false,
                        message:"User not found",
            
                    })
                }
                const {username,phone,address}=req.body
                let updatedUser=await usersModel.findByIdAndUpdate(req.body.id,{
                  username,
                  phone,
                  address
                },{new:true})
                updatedUser.password=undefined;
                if(updatedUser){
                  return res.status(200).json({
                      message:"user updated",
                      success:true,
                      newData:updatedUser
                  })
                }
      } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error in update User api",
            error:error.message
        })
      }
}
module.exports={
     userController,
     updateUserController
}
