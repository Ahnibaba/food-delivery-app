import express from "express"
import { logout } from "../controllers/logoutController.js"
import authMiddleware from "../middleware/auth.js"


const logoutRouter = express.Router()

logoutRouter.post("/logout", logout)

export default logoutRouter