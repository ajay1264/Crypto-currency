import express from "express"
import cors from "cors"
import tickerRoutes from "./Routes/ticker.routes.js"


const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
    
}));
app.use(express.json());

app.use('/tickers', tickerRoutes)




export default app
// http://localhost:8000/tickers