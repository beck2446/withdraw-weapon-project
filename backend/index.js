//required all dependencies
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('./setup/passport-config')
const session = require('express-session')
require('dotenv').config()
const authRouter = require('./setup/routes/authRoute')
const port = process.env.PORT

const app = express()

//initialize a global middleware
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use(session({
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())

//setup routing
app.get('/unauthorized',(req,res)=>{
    res.status(401).end()
})

app.post('/login',passport.authenticate('local',{
    successRedirect : '/authorized',
    failureRedirect : '/unauthorized'
}))

app.use(authRouter)

app.listen(port,()=>console.log(`Listening on port ${port}`))

module.exports = app