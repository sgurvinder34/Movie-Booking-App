const mongoose=require("mongoose")
const constant=require("../Utils/movie")

const movieObj=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    casts:{
        type:String,
        required:true
    },
    trailerUrls:{
        type:[String],
    },
    posterUrls:{
        type:[String]
    },
    languages:{
        type:[String],
        required:true
    },
    releaseDate:{
        type:Date
    },
    releaseStatus:{
        type:String,
        default:constant.movieStatus.comingsoon,
        enum:[constant.movieStatus.blocked,constant.movieStatus.comingsoon,constant.movieStatus.released]
    },
    imdbRating:{
        type:Number,
        required:true
    },
    genre:{
        type:String,
        enum:[constant.genre.action,constant.genre.comedy,constant.genre.drame,constant.genre.horror,constant.genre.mystery,constant.genre.romance,constant.genre.thriller]
    },
    theatreId:{
        type:[String],
        ref:"Theatre"
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model("Movie",movieObj)