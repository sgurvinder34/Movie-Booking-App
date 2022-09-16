const User=require("../model/user.model")


exports.getAll=async(req,res)=>{
    try{
        const user=await User.findOne({userId:req.user})
        res.status(200).send({
            userName:user.name,
            userId:user.userId,
            emailId:user.emailId,
            theatreowned:user.theatreOwned
        })
    }
    catch(err){
        console.log("controller/user/get All",err)
        res.status(500).send("There was an error from our side")
    }
}