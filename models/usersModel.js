const mongoose=require('mongoose');

//  Create Users Schema 

 const userSchema=new mongoose.Schema({
      username:{
        type:String,
        required:[true,"user name is required"]
      },
      email:{
        type:String,
        required:[true,"user email is required"],
        unique:true
      },
      password:{
        type:String,
        required:[true,"user password is required"]
      },
      address:{
        type:Array
      },
      phone:{
        type:String,
        required:[true,"user phone number is required"]
      },
      userType:{
        type:String,
        required:[true,"user type is required"],
        default:"client",
        enum:["client","admin","vendor","driver"]
      },
      profile:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/128/1077/1077063.png"
      }
 },{timestamps:true})

 module.exports=mongoose.model("User",userSchema)