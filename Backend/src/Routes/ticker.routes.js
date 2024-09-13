import express from "express"
import {getTicker} from "../controllers/tickerController.js"


const router = express.Router();



router.get('/', getTicker)

export default router