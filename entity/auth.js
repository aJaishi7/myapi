const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Enter Fullname"]
    },
    username: {
        type: String,
        required: [true, "Enter Username"],
        unique: true,
        minlength: 5
    },
    password: {
        type: String,
        required: [true, "Enter Password"],
        minlength: 5
    },
    phone: {
        type: String,
        required: [true, "Enter Phone Number"],
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    // address: {
    //     type: String,
    //     required: false,
    //     default: 'Kathmandu Nepal'
    // },
    // email: {
    //     type: String,
    //     required: false,
    //     default: 'someone@example.com',
    //     unique: true
    // },
    // gender: {
    //     type: String,
    //     enum: ["Male", "Female", "Others"],
    //     default: "Male",
    //     required: false
    // },
    // photo: {
    //     type: String,
    //     required: false
    // },
    // usertype: {
    //     type: String,
    //     enum: ['User', 'Doctor'],
    //     default: "User",
    //     required: true
    // },
    // dateOfBirth: {
    //     type: Date,
    //     required: false
    // },
    // specialistAt: {
    //     type: String,
    //     required: false
    // },
    // experience: {
    //     type: String,
    //     required: false
    // }
});

module.exports = mongoose.model("User", UserSchema);

