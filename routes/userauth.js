var express=require("express");

var route=express.Router();

var path =require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");

route.get("/register", function(req,res){
    if(req.user){
        res.redirect("/");
    }
    res.sendFile(path.join(__dirname,"../views/register.html"))
});

route.get("/", function(req,res){
    if(req.user){
        res.redirect("/welcomepage");
    }
    res.sendFile(path.join(__dirname,"../views/index.html"))
});

module.exports=route;