const mongooes = require("mongoose");
const Schema = mongooes.Schema;
const fs = require('fs')

var userSchema = new Schema({
    firstname: String,
    lastname: String,
    gender: String,
    country: String,
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    club: { type: String },
    role: { type: String, enum: ["Admin", "User"], default: "User"},
    profilePicture: {type:String, default:"pictures\\uploads\\user.png"}
});

userSchema.post('init', function( data) {
    if (data){
        data.profilePicture = (data.profilePicture &&
             fs.existsSync(data.profilePicture)) 
             ? data.profilePicture 
             : "pictures\\uploads\\user.png";    
    }
});

const User = mongooes.model("User", userSchema);

module.exports = User;
