const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");

//connection


const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.urlencoded({extended:false}));

app.use('/', userRouter);

app.listen(process.env.PORT || 3000 , ()=>{
    console.log(`Server is started at 3000`);
});