const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({ 
    name:String, 
    email:String, 
    password:String, 
    dateOfBirth:String
}) 
const User =mongoose.model('User',UserSchema);
module.exports=User;
//In this case, the "UserSchema" schema defines the structure of a user document with properties like "name", "email", "password", and "createdAt". The "mongoose.model()" method takes two arguments: the first argument is the name of the model, which is "User" in this case, and the second argument is the schema that the model should use, which is "UserSchema".