const usersModel = require("../models/usersModel");
const bcrypt = require("bcryptjs");
          const jwt=require('jsonwebtoken')
const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;

    // Validate for field
    if (!username || !email || !password || !phone || !address) {
      return res.status(500).json({
        message: "Please provide all field",
        success: false,
      });
    }

    // check existing users
    const existingUser = await usersModel.findOne({ email });
    if (existingUser) {
      return res.status(500).json({
        message: "User is already exist",
        success: false,
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hashSync(password, salt);

    // createnew user
    const user = await usersModel.create({
      username,
      email,
      password: hashpassword,
      phone,
      address,
    });
    if (user) {
      return res.status(201).json({
        message: "user created successfully",
        success: true,
        user: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error: error.message,
    });
  }
};

// LOGIN Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        message: "Please provide email and password",
      });
    }
    // check if user exist or not
    const userexist = await usersModel.findOne({
      email: email
    });
    
    if (!userexist) {
      return res.status(500).json({
        message: "user not fount ! Please register first",
        success: false,
      });
    }
//  compare password
const isMatched=await bcrypt.compare(password, userexist.password)
   console.log(isMatched);
   
   if(!isMatched){
    return res.status(500).json({
      success: false,
      message: "invalid credentials",
      
    });
   }
    
     const token=await jwt.sign({id:userexist._id},process.env.JWT_SECRET,{
       expiresIn:'7d'
     })

   userexist.password=undefined;
    return res.status(200).json({
      success: true,
      message: "User login successfully",
      token:token,
      user: userexist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in login api",
      error: error.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
