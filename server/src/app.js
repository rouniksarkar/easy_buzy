import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors(
    {
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:3000",
            // add url or ip
        ],
        credentials: true
    }
))

import imageKitRoutes from "./routes/imageKit.routes.js"

app.use("/api/imageKit",imageKitRoutes)

// app.get("/", (req, res) => {
//     res.send("New B2B project is on the way!")
// })

// app.get("/test", (req, res) => {
//     res.json({ message: "testing on connectivity on docker." })
// })

//authentication routes
import authRoutes from "./routes/user.routes.js"

app.use("/api/auth",authRoutes)

export { app }