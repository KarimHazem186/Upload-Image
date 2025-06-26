const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    imgpath: {
        type:String,
        required:true
    },
    date: {
        type:Date,
    }
})

// Create Model 

const usersModel = new mongoose.model("users",userSchema);

module.exports = usersModel;