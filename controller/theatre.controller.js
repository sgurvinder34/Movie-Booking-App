const Theatre=require("../model/theatre.model")
const Movie=require("../model/movie.model")
const constant = require("../Utils/movie")
const User=require("../model/user.model")

exports.create=async(req,res)=>{
    const user1=await User.findOne({userId:req.user})
    console.log(user1)
    const theatreObj={
        userId:user1._id,
        name:req.body.name,
        description:req.body.description,
        city:req.body.city,
        pincode:req.body.pincode,
        showTypes:req.body.showTypes,
        numberOfSeats:req.body.numberOfSeats
    }
    try{
        const theatre=await Theatre.create(theatreObj)
        console.log("This is Theatre")
        
        if(theatre){
            await theatre.save()
            const user1=await User.findOne({userId:req.user})
            user1.theatreOwned.push(theatre._id)
            
            await user1.save()
            res.status(201).send({
                id:theatre._id,
                TheatreIs:theatre
            })
        }
    }
    catch(err){
        console.log("controller/theatre/create",err)
        res.status(500).send("There was an error from our side")
    }
}

exports.update=async(req,res)=>{
    try{
        const theatre=await Theatre.findOne({_id:req.params.id})
        theatre.name=req.body.name!==undefined? req.body.name:theatre.name
        theatre.description=req.body.description!==undefined? req.body.description:theatre.description
        theatre.city=req.body.city!==undefined? req.body.city:theatre.city
        theatre.pincode=req.body.pincode!==undefined? req.body.pincode:theatre.pincode
        theatre.showTypes=req.body.showTypes!==undefined? req.body.showTypes:theatre.showTypes
        theatre.numberOfSeats=req.body.numberOfSeats!==undefined? req.body.numberOfSeats:theatre.numberOfSeats

        await theatre.save()
        res.status(200).send(theatre)
    }
    catch(err){
        console.log("controller/theatre/update",err)
        res.status(500).send("There was an error from our side ")
    }
}

exports.delete=async(req,res)=>{
    try{
        const theatre=await Theatre.findOne({_id:req.params.id})
        await theatre.remove()
        res.status(200).send("Theatre deleted successfully")
    }
    catch(err){
        console.log("controller/theatre/delete",err)
        res.status(500).send("There was an error from our side ")
    }
}

exports.findAll=async(req,res)=>{
    try{
        const theatre=await Theatre.find()
        res.status(200).send(theatre)
    }
    catch(err){
        console.log("Controller/theatre/findAll",err)
        res.status(200).send("There was an error from our side")
    }
}
exports.addMovieToAtheatre=async(req,res)=>{
    try{
        const theatre=await Theatre.findOne({_id:req.params.id})
        console.log(theatre)
        if(!req.body.movieId){
            return res.status(400).send("Provide Movies")
        }
        const length=req.body.movieId.length
        for(let i=0;i<req.body.movieId.length;i++){
            theatre.movieId.push(req.body.movieId[i])
            const movie=await Movie.findOne({_id:req.body.movieId[i]})
            movie.theatreId.push(theatre._id)
            await theatre.save()
            await movie.save()
        }
        res.status(201).send("The Movie is added")
    }
    catch(err){
        console.log("controller/theatre/addmovietotheatre",err)
        res.status(500).send("There was am error from our side")
    }

}
exports.deleteAMovie=async(req,res)=>{
    try{
        const theatre=await Theatre.findOne({_id:req.params.id})
        for(let i=0;i<theatre.movieId.length;i++){
            if(theatre.movieId[i]==req.body.movieId){
                theatre.movieId.splice(i,i+1)
                await theatre.save() 
            }
            
        }
        const movie=await Movie.findOne({_id:req.body.movieId})
        for(let i=0;i<movie.theatreId.length;i++){
            if(movie.theatreId[i]==theatre._id){
                movie.theatreId.splice(i,i+1)
                await movie.save()
            }
        }
        res.status(200).send("Movie Removed")
        
    }
    catch(err){
        console.log("controller/theatre/deletemovies",err)
        res.status(500).send("There was an error from our side")
    }
}
