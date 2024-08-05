import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"







// app config
const app = express()

const PORT = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB()


// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))

app.get("/", (req, res) => {  
    res.send("API working");
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})



//mongodb+srv://food-delivery:ani0520@cluster0.8phgzn3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0