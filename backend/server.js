import dotenv from "dotenv"
dotenv.config()
// import "dotenv/config"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDB } from "./config/db.js"
import corsOptions from "./config/corsOptions.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import logoutRouter from "./routes/logoutRoute.js"
import orderRouter from "./routes/orderRoute.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




// app config
const app = express()

const PORT = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(cookieParser())
//app.use(cors(corsOptions));
app.use(cors({
    origin: "https://food-delivery-app-swj3.vercel.app",
    credentials: true
}));



  


// db connection
connectDB()


// api endpoints
app.use("/api/food", foodRouter)
app.use("/", express.static("public"))
app.use("/images", express.static("./views/uploads"))
app.use("/api/user", userRouter)
app.use("/api/user", logoutRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)




app.get("/", (req, res) => {  
    res.sendFile(__dirname + "/views/index.html")
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})



//mongodb+srv://food-delivery:ani0520@cluster0.8phgzn3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
