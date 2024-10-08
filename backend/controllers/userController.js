import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"


// login user
const loginUser = async (req, res) => {
   console.log("am here");
   
   const { email, password } = req.body

   try {
       const user = await userModel.findOne({ email })

   if (!user) {
       return res.status(404).json({ success: false, message: "User does not exist" })
   }

   const comparePassword = await bcrypt.compare(password, user.password)
   if (!comparePassword) {
       return res.status(401).json({ success: false, message: "Enter a valid password" })
   }

   const accessToken = jwt.sign(
       { id: user._id },
       process.env.ACCESS_TOKEN_SECRET,
       { expiresIn: "1m" }
   )
   console.log("This is my accesstoken ----- " + accessToken);
   
   const refreshToken = jwt.sign(
       { id: user._id },
       process.env.REFRESH_TOKEN_SECRET,
       { expiresIn: "2m" }
   )
  
   res.cookie('accessToken', accessToken, {
    maxAge: 1 * 60 * 1000 , // cookie will expire in 15 minutes
    httpOnly: true, // cookie is only accessible by the web server
    secure: true, // cookie will be sent only over HTTPS
    sameSite: "none"
});
   res.cookie('refreshToken', refreshToken, {
    maxAge: 2 * 60 * 1000, // cookie will expire in 15 minutes
    httpOnly: true, // cookie is only accessible by the web server
    secure: true, // cookie will be sent only over HTTPS
    sameSite: "none"
});

  

//    req.session.accessToken = accessToken
//    req.session.refreshToken = refreshToken


  
   
   







   res.status(200).json({ success: true, accessToken, message: "Logged in successfully" })

   } catch (error) {
       console.log(error);
       res.status(400).json({ success: false, message: "Login failed" })
       
   }
   



}


// register user
const registerUser = async (req, res) => {
   const { name, password, email } = req.body

   try {
    //checking if user already exist
      const exists = await userModel.findOne({ email })
      if (exists) {
         return res.status(409).json({ success: false, message: "User already exist" })
      }

      // validating email format and a strong password
      if(!validator.isEmail(email)) {
         return res.status(400).json({ success: false, message: "Please enter a valid email" })
      }
      if (password.length < 8) {
         return res.status(400).json({ success: false, message: "Please enter a strong password" })
      }

      // hashing user password
      const salt = await bcrypt.genSalt(10, password)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUser = new userModel({ 
        name: name,
        email: email,
        password: hashedPassword
       })

       const user = await newUser.save()

       res.status(200).json({ success: true, message: "User Successfully Created" })

   } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, message: error })
      
   }
}





export { loginUser, registerUser }