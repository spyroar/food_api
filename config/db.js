const mongoose=require('mongoose');
const colors=require('colors')

 const connectDB=async()=>{
   try {
          await mongoose.connect(process.env.MONGO_URL)
          console.log(`Connected to database ${mongoose.connection.host}`.bgWhite.blue)
    
   } catch (error) {
      console.log("DB error",error)
   }
 }

 module.exports=connectDB