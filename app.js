const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const path = require('path');
const Connect = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//Implement app.env
dotenv.config({
    path: "./config/app.env",
});


//Connect to Database
Connect();

//Load Routes
const authRoute = require('./routes/auth');
const diseaseRoute = require('./routes/disease');

//BodyParser and Cookie parser
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());



//Mount User Route
app.use('/api/', authRoute);
app.use('/api/',diseaseRoute);


const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;
app.listen(
    PORT,
    () => console.log(`\n*****Server Started*****   
    Host : ${HOST}   
    Mode:${process.env.NODE_ENV} 
    PORT: ${PORT}`.yellow.bold)
);
