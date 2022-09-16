const mongoose=require("mongoose")
const constant=require("../Utils/theatre.utils")

const theatreObj=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    pincode:{
        type:Number,
        required:true
    },
    showTypes:{
        type:[String],
        required:true,
        enum:[constant.showTypes.afternoon,constant.showTypes.evening,constant.showTypes.morning,constant.showTypes.night]
    },
    numberOfSeats:{
        type:Number,
        required:true
    },
    movieId:{
        type:[String],
        ref:"Movie"
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model("Theatre",theatreObj)