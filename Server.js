const express=require("express")
const app=express()
const User=require("./model/user.model")
const Movie=require("./model/movie.model")
const Theatre=require("./model/theatre.model")
const mongoose=require("mongoose")
const dbconfig=require("./config/db.config")
const server=require("./config/server.config")
const bodyparser=require("body-parser")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

mongoose.connect(dbconfig.DB_URL)
const db=mongoose.connection
db.on("error",()=>{
    console.log("Could not connect to the DB")
})
db.once("open",()=>{
    console.log("You are successfully connected to the DB")
    init()
})

async function init(){
    await User.collection.drop()
    await Movie.collection.drop()
    await Theatre.collection.drop()
}



require("./routes/auth.route")(app)
require("./routes/movie.route")(app)
require("./routes/theatre.routes")(app)
require("./routes/user.route")(app)

app.listen(server.PORT,()=>{
    console.log(`You are Connected to the port Number ${server.PORT}`)
})