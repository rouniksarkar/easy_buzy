import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())

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

app.get("/", (req, res) => {
    res.send("New B2B project is on the way!")
})

app.get("/test", (req, res) => {
    res.json({ message: "testing on connectivity on docker." })
})

export { app }