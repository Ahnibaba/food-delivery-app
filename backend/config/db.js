import mongoose from "mongoose";



 export const connectDB = async () => {
    try{
      //await mongoose.connect("mongodb+srv://food-delivery:ani0520@cluster0.8phgzn3.mongodb.net/food-deliveryDB?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log("DB connected"))
      await mongoose.connect("mongodb://127.0.0.1:27017/food-deliveryDB").then(() => console.log("DB connected"))
    } catch (err) {
       console.log(err);
    }
}
