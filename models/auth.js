const mongoose=require('mongoose');
const AuthSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    emailVerification:{
        type:String,
        required:true,
        default:false
    },
    role:{
        type:String,
        required:true,
        default:'user'
    },
    password:{
        type:String
    },
},{timestamps:true});

module.exports=mongoose.model("Auth",AuthSchema);