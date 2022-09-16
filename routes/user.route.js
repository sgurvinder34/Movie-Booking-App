const controller=require("../controller/user.controller")
const middlware=require("../middleware/auth.middlware")

module.exports=(app)=>{
    app.get("/mba/api/v1/user",[middlware.verifytoken],controller.getAll)
}