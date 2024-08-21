import express from "express"
import { logout } from "../controllers/logoutController.js"


const logoutRouter = express.Router()

logoutRouter.get("/logout", logout)

export default logoutRouter