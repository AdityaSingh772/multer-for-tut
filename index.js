require('dotenv').config();

const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const app = express();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//connection
const connectDB = async()=> {
    await mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongoDB connected");
})
}
connectDB();


//middleWares
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));

//routes
app.use('/', userRouter);


//server start
app.listen(process.env.PORT || 3000 , ()=>{
    console.log(`Server is started at 3000`);
});