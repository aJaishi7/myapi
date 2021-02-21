const express = require('express');
const colors = require('colors');
const app = express();
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: "./config/app.env",

});

const authRoute = require('./routes/auth');
app.use('/api/user',authRoute);










const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;
app.listen(PORT,
    () =>
        console
            .log(`\n*****Server Started*****\n   Host : ${HOST}\n   Mode:${process.env.NODE_ENV}\n   PORT: ${PORT}`.yellow.bold)
);