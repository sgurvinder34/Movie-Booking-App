const controller=require("../controller/theatre.controller")
const middleware=require("../middleware/auth.middlware")

module.exports=(app)=>{
    app.post("/mba/api/v1/theatre",[middleware.verifytoken],controller.create)
    app.put("/mba/api/v1/theatre/:id",[middleware.verifytoken],controller.update)
    app.delete("/mba/api/v1/theatre/:id",[middleware.verifytoken],controller.delete)
    app.get("/mba/api/v1/theatre",[middleware.verifytoken],controller.findAll)
    app.post("/mba/api/v1/theatre/:id/movies",[middleware.verifytoken],controller.addMovieToAtheatre)
    app.delete("/mba/api/v1/theatre/:id/movies",[middleware.verifytoken],controller.deleteAMovie)
}