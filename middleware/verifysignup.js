const User=require("../model/user.model")


const signup=async(req,res,next)=>{
    if(!req.body.name){
        return res.status(400).send("Name Required")
    }
    if(!req.body.userId){
        return res.status(400).send("UserId Required")
    }
    const userId=await User.findOne({userId:req.body.userId})
    if(userId){
        return res.status(400).send("UserId Already Taken,Try Another")
    }
    if(!req.body.emailId){
        return res.status(400).send("EmailId Required")
    }
    const user=await User.findOne({emailId:req.body.emailId})
    if(user){
        return res.status(400).send("EmailId Already Taken,Try Another")
    }
    if(!req.body.password){
        return res.status(400).send("password Required")
    }
    next()
}

module.exports={
    signup:signup
}