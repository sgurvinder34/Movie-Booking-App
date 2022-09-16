const controller=require("../controller/movie.controller")
const middleware=require("../middleware/auth.middlware")

module.exports=(app)=>{
    app.post("/mba/api/v1/movie",[middleware.verifytoken],controller.create)
    app.put("/mba/api/v1/movie/:id",[middleware.verifytoken],controller.update)
    app.delete("/mba/api/v1/movie/:id",[middleware.verifytoken],controller.delete)
    app.get("/mba/api/v1/movie",[middleware.verifytoken],controller.FindAll)
}