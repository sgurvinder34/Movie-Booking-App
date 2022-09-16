const controller=require("../controller/auth.controller")
const middleware=require("../middleware/verifysignup")
module.exports=(app)=>{
    app.post("/moviebookingapp/api/v1/user/signup",[middleware.signup],controller.signUp)
    app.post("/moviebookingapp/api/v1/user/signin",controller.signIn)
}