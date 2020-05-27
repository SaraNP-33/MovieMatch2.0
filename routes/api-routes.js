var express=require("express");

var router=express.Router();

var axios=require("axios");

var cors=require("cors");

var db=require("../models");

var path=require("path");


router.get("/user/movie", function(req,res){
    res.sendFile(path.join(__dirname,"../views/userPage.html"))
});

router.get("/addFavorites", function(req,res){
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
        },
        raw:true
       
    })
    .then(function(dbMovie){
        console.log(dbMovie);
        res.send(dbMovie);
    })
    // res.send(movie)
    });
    
});
router.post("/addFavorites/:id", function(req,res){
    var movieId=req.params.id
    var userId=req.user.id

    db.MovieUser.create({
        UserId:userId,
        MovieId:movieId
    }).then(response=>{
        res.sendStatus(200)
    }).catch(err=>{
        res.json(err)
    });
});

router.get("/addFavorites/:movie",function(req,res){
  
    db.Movie.findOne({
        where:{
            id:req.params.id,
            movieTitle: req.params.movieTitle,
            moviePoster:req.params.moviePoster,
            moviePlot:req.params.moviePlot,
            movieGenre:req.params.movieGenre,
            movieYear:req.params.movieYear
        },
        raw:true,

       
    }).then(response=>{
        console.log(response)
        res.send(response)
    }).catch(err=>{
        res.json(err)
    });
});


module.exports=router;