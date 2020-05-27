var express=require("express");

var router=express.Router();

var path =require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/register", function(req,res){
    if(req.user){
        res.redirect("/user/movies");
    }
    res.sendFile(path.join(__dirname,"../views/register.html"))
});

router.get("/", function(req,res){
    if(req.user){
        res.redirect("/user/movies");
    }
    res.sendFile(path.join(__dirname,"../views/index.html"))
});

module.exports=router;