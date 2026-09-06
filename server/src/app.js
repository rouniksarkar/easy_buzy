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

//authentication routes
import authRoutes from "./routes/user.routes.js"

app.use("/api/auth",authRoutes)

//product routes

import productRoutes from "./routes/product.routes.js"

app.use("/api/product",productRoutes)

// purchase order request routes

import purchaseRequestRoutes from "./routes/purchaseRequest.route.js"

app.use("/api/purchaseRequest",purchaseRequestRoutes)

// orders routes

import orderRoutes from "./routes/order.routes.js";

app.use("/api/orders",orderRoutes)

// notification 

import notificationRoutes from "./routes/notification.routes.js"

app.use("/api",notificationRoutes)

export { app }