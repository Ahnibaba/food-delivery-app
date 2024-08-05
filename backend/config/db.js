import mongoose from "mongoose";



 export const connectDB = async () => {
    try{
      await mongoose.connect("mongodb://127.0.0.1:27017/food-deliveryDB").then(() => console.log("DB connected"))
      //await mongoose.connect(process.env.DATABASE_URL).then(() => console.log("DB connected"))
    } catch (err) {
       console.log(err);
    }
}
