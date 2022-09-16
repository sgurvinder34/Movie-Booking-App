const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:Number,
        required:true
    },
    emailId:{
        type:String,
        required:true,
        minLength:10,
        unique:true,
        lowerCase:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now()
        }
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now()
        }
    },
    theatreOwned:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Theatre"
    }
})

module.exports=mongoose.model("User",userSchema)