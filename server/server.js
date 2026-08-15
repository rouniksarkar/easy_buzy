import 'dotenv/config';

import connectDB from "./db/configDB.js"
import {app} from "./src/app.js"

const PORT = process.env.PORT || 3000;

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);       
    })
})
.catch(()=>{
    console.log("MongoDb connection fails!");
    
})

