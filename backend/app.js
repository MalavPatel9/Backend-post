const path = require('path')
const express = require('express')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const postsRoutes = require("./routes/posts");
const Post = require ('./models/post')
const app = express();
mongoose.connect('mongodb+srv://malav:TfrgDIATH3PnItKM@cluster0.3epcd.mongodb.net/node-angular?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected database');
})
.catch(()=>{
    console.log('connection failed');
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join("backend/images")))
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
                  "Origin, X-Requested-With, Content-type, Accept" );
    res.setHeader("Access-Control-Allow-Methods",
                  "GET,POST,OPTIONS,DELETE,PATCH,PUT");              
                  next()
})

app.use("/api/posts", postsRoutes);
module.exports=app;