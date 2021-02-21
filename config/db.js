const mongoose = require('mongoose');
const connect = async () => {
    const conn =  await mongoose.connect(process.env.DATABASE_URI,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

    console.log(`MongoDB Connected to ${ conn.connection.host}`.green.underline.bold);
};

module.exports = connect;