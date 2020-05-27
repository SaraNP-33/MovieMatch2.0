var express=require("express");

var router=express.Router();

var axios=require("axios");

var cors=require("cors");

var db=require("../models");

var path=require("path");

router.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"../views/index.html"))
});

router.get("/user/movie", function(req,res){
    res.sendFile(path.join(__dirname,"../views/userPage.html"))
});

router.get("/movies", function(req,res){
    res.sendFile(path.join(__dirname,"../views/movies.html"))
});

router.get("/user/movie/:title" ,function(req,res){
    var title=req.params.title;
    title=title.replace(" ", "%20");

    var uri=`http://www.omdbapi.com/?t=${title}&apikey=trilogy`
    console.log(uri);

    axios.get(uri)
    .then(response=>{
        movie=response.data;
        console.log(movie.Title);

    db.Movies.findOrCreate({
        where:{
            movieTitle: movie.Title,
            moviePoster:movie.Poster,
            moviePlot:movie.Plot,
            movieGenre:movie.Genre,
            movieYear:movie.Year
        }
       
    });
    res.send(movie)
    });
    
});


module.exports=router;