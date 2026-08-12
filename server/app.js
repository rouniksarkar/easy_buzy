import express from "express"

const app = express()

app.get("/",(req,res)=>{
    res.send("New B2B project is on the way!")
})

export {app}