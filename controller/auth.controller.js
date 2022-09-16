const User=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const auth=require("../config/auth.config")


exports.signUp=async(req,res)=>{
    const userObj={
        name:req.body.name,
        userId:req.body.userId,
        emailId:req.body.emailId,
        password:bcrypt.hashSync(req.body.password,10)
    }
    try{
        const user=await User.create(userObj)
        if(user){
            res.status(201).send("User Created SuccessFully")
        }
    }
    catch(err){
        console.log("controller/auth/signup",err)
        res.status(500).send("There was An error from our side while creating the User")
    }
}

exports.signIn=async(req,res)=>{
    try{
        const user=await User.findOne({userId:req.body.userId})
        if(!user){
            return res.status(400).send("UserId is Wrong")
        }
        const isvalidpassword=bcrypt.compareSync(req.body.password,user.password)
        if(!isvalidpassword){
            return res.status(400).send("Password is Wrong")
        }
        const token=jwt.sign({id:user.userId},auth.secretKey,{expiresIn:86400})
        res.status(200).send({
            name:user.name,
            userId:user.userId,
            emailId:user.emailId,
            AccessToken:token
        })
    }
    catch(err){
        console.log("controller/auth/signin",err)
        res.status(500).send("there was an error from our side")
    }
}