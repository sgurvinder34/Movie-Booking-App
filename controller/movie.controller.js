const Movie=require("../model/movie.model")
const User=require("../model/user.model")

exports.create=async(req,res)=>{
    const movieObj={
        name:req.body.name,
        description:req.body.description,
        casts:req.body.casts,
        trailerUrls:req.body.trailerUrls,
        posterUrls:req.body.posterUrls,
        languages:req.body.languages,
        releaseDate:req.body.releaseDate,
        releaseStatus:req.body.releaseStatus,
        imdbRating:req.body.imdbRating,
        genre:req.body.genre
    }
    try{
        const user=await Movie.create(movieObj)
        if(user){
            console.log(user)
            res.status(201).send({
                id:user._id,
                name:user.name,
                description:user.description,
                casts:user.casts,
                trailerUrls:user.trailerUrls,
                posterUrls:user.posterUrls,
                languages:user.languages,
                releaseDate:user.releaseDate,
                releaseStatus:user.releaseStatus,
                imdbRating:user.imdbRating,
                genre:user.genre
            })
        }
    }
    catch(err){
        console.log("Controller/movie/create",err)
        res.status(500).send("There was an error from our side")
    }
}

exports.update=async(req,res)=>{
    try{
        const movie=await Movie.findOne({_id:req.params.id})
        console.log(movie)
        movie.name=req.body.name!==undefined? req.body.name : movie.name
        movie.description=req.body.description!==undefined? req.body.description : movie.description
        movie.casts=req.body.casts!==undefined? req.body.casts : movie.casts
        movie.trailerUrls=req.body.trailerUrls!==undefined? req.body.trailerUrls : movie.trailerUrls
        movie.posterUrls=req.body.posterUrls!==undefined? req.body.posterUrls : movie.posterUrls
        movie.languages=req.body.languages!==undefined? req.body.languages : movie.languages
        movie.releaseDate=req.body.releaseDate!==undefined? req.body.releaseDate : movie.releaseDate
        movie.releaseStatus=req.body.releaseStatus!==undefined? req.body.releaseStatus : movie.releaseStatus
        movie.imdbRating=req.body.imdbRating!==undefined? req.body.imdbRating : movie.imdbRating
        movie.genre=req.body.genre!==undefined? req.body.genre : movie.genre

        await movie.save()
        res.status(200).send({
            _id:movie._id,
            moviesAre:movie
        })
    }
    catch(err){
        console.log("controller/movie/update",err)
        res.status(500).send("There was an error from our side")
    }

}
exports.delete=async(req,res)=>{
    try{
        const movie =await Movie.findOne({_id:req.params.id})
        console.log(movie)
        await movie.remove()
        res.status(200).send("Movie deleted successfully")
    }
    catch(err){
        console.log("controller/movie/delete",err)
        res.status(500).send("There was an error from our side")
    }
}

exports.FindAll=async(req,res)=>{
    try{
        const movie=await Movie.find()
        res.status(200).send(movie)
    }
    catch(err){
        console.log("controller/movie/findll",err)
        res.status(500).send("There was an error from our side")
    }
}
