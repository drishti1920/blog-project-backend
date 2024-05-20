const express = require('express')
require('dotenv').config()
const app=express()
const mongoose = require('mongoose')
const User = require("./routers/UserRouter")
app.use(express.json());


const databaseString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@blog-website.ug68vca.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGODB_USER}`

mongoose.connect(databaseString,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to mongoDB")
})
.catch((err)=>{
    console.log("Error connecting to mongodb: ", err)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Development Server is running on port ${PORT}`);
});

app.use("/user", User)