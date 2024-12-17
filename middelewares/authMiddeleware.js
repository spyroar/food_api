const jwt=require('jsonwebtoken')

const authMiddeleware=async(req,res,next)=>{
     try {
           const token=req.headers["authorization"].split(" ")[1];
            await jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
                   if(err){
                    return res.status(500).json({
                        message:"Unauthorize User",
                        success:false,
                        
                        
                 })
                   }
                   else{
                    req.body.id=decode.id
                    next();
                   }
            })
     } catch (error) 
     {
         console.log(error.message);
         
        return res.status(500).json({
               message:"Please provide token or login fisrt",
               success:false,
               error:error.message
        })
     }
}

module.exports={authMiddeleware}