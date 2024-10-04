import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json());
app.use(helmet());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(morgan('combined'));

app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({extended:true, limit: "20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.routes.js"
import clientRouter from "./routes/client.route.js"
import productServiceRouter from "./routes/productService.routes.js"

//routes declaration
app.use("/api/users", userRouter)
app.use("/api/client", clientRouter)
app.use("/api/productService", productServiceRouter)

export { app }