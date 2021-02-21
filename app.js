const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const path = require('path');
const Connect = require('./config/db');
const bodyParser = require('body-parser');

//Implement app.env
dotenv.config({
    path: "./config/app.env",
});
//Connect to Database
Connect();

//Load Routes
const authRoute = require('./routes/auth');

const app = express();

//BodyParser, to receive data from postman and forms
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Mount User Route
app.use('/api/user',authRoute);



const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;
app.listen(PORT,
    () =>
        console
            .log(`\n*****Server Started*****\n   Host : ${HOST}\n   Mode:${process.env.NODE_ENV}\n   PORT: ${PORT}`.yellow.bold)
);