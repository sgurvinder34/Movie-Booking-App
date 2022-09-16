const jwt=require("jsonwebtoken")
const auth=require("../config/auth.config")


const verifytoken=async(req,res,next)=>{
    const token=req.headers["x-access-token"]
    if(!token){
        return res.status(400).send("Token required")
    }
    jwt.verify(token,auth.secretKey,(err,decoded)=>{
        if(err){
            console.log("Wrong token")
            return res.status(400).send("Invalid Token")
        }
        req.user=decoded.id
        console.log("This is Req.USER",req.user)
        next()
    })

}



module.exports={verifytoken}
//inkoop