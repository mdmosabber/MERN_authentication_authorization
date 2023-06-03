const mongoose = require('mongoose');

// Define a schema
const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Enter Your Name'],
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            require: [true, 'Enter Your Email']
        },
        password: {
            type: String,
            required: [true, 'Enter Your Password'],
            min: 6,
            max: 64
        },
    },
    {timestamps: true, versionKey:false}
);

// Create a model
const User = mongoose.model('User', userSchema);

module.exports = User;