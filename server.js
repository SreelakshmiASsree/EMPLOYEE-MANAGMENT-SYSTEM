const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler")
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const { getSessionId } = require("./authentication");

connectDb();
const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(getSessionId);

app.use(express.json());

//routes//
app.use("/api/employees",require("./routes/employeesroutes"));
app.use("/api/users",require("./routes/userroutes"));
app.use("/",require("./routes/viewRoute"))
// app.use(errorHandler);

//ejs
app.set('view engine','ejs');
app.set("views",path.join(__dirname,"views"));

//static files
app.use('/javascript',express.static(path.resolve(__dirname,"public/javascript")));
app.use('/css',express.static(path.resolve(__dirname,"public/css")));
app.use('/image',express.static(path.resolve(__dirname,"public/image")));


//image
app.use('/uploads',express.static(path.resolve(__dirname,"public/uploads")));

//port
app.listen(port,()=>{
    console.log(`server is running : http://localhost:${port}`); 
})