var express=require("express");

var router=express.Router();

var axios=require("axios");

var cors=require("cors");

var db=require("../models");

var path=require("path");

router.get("/welcomepage", function(req,res){
    res.sendFile(path.join(__dirname,"../views/welcomePage.html"))
});

router.get("/user/movie", function(req,res){
    res.sendFile(path.join(__dirname,"../views/searchPage.html"))
});

router.get("/addFavorites", function(req,res){

    res.sendFile(path.join(__dirname,"../views/movies.html"))
});

router.get("/user/movie/:search" ,function(req,res){
    var search=req.params.search;
    search=search.replace(" ", "%20");

    var uri=`http://www.omdbapi.com/?s=${search}&apikey=trilogy`
    console.log(uri);

    axios.get(uri)
    .then(response=>{
       var movie=response.data;
        // console.log(movie.Title);

    // db.Movies.findOrCreate({
    //     where:{
    //         movieTitle: movie.Title,
    //         moviePoster:movie.Poster,
    //         moviePlot:movie.Plot,
    //         movieGenre:movie.Genre,
    //         movieYear:movie.Year
    //     },
    //     raw:true
       
    // })
    // .then(function(dbMovie){
    //     console.log(dbMovie);
    //     res.send(dbMovie);
    // })
    res.send(movie)
    });

    router.get("/movies/:onemovie",function(req,res){
        console.log("route was hit")
        var onemovie = req.params.onemovie;
        var url=`http://www.omdbapi.com/?i=${onemovie}&apikey=trilogy`
        console.log(url)

        axios.get(url)
        .then(response=>{
            var movie=response.data;
            res.send(movie)
            console.log(movie)
        }).catch(function(err){
            console.log(err)
        });

    });
});
router.post("/addFavorites/", function(req,res){
    console.log("unicorn")
    var addMovie=response.data
    db.Movies.findOrcreate({
        where:{
            movieTitle:addMovie.Title,
            moviePoster:addMovie.Poster,
            moviePlot:addMovie.Plot,
            movieGenre:addMovie.Genre,
            movieYear:addMovie.Year
        }
    }).then(dbMovie=>{
        console.log(dbMovie)
        var movieId=req.params.id
        var userId=req.user.id

        db.MovieUser.create({
            userID:userId,
            MovieID:movieId
        }).then(response=>{
            res.status(200)
        });
    });
});



// router.post("/addFavorites/:id", function(req,res){
//     console.log("unicorn")
//     var movieId=req.params.id
//     var userId=req.user.id

//     db.MovieUser.create({
//         UserId:userId,
//         MovieId:movieId
//     }).then(response=>{
//         console.log(response)
//         console.log("****************************")
//         db.Movies.findOne({
//             where:{
//                 id:movieId
//             },
//             raw:true
            
//         }).then(result=>{
//             console.log(result)
//             console.log("dragon")
//             res.send(result)
//         }).catch(err=>{
//             res.json(err)
//         });
//     }).catch(err=>{
//         console.log(err)
//     });
// });

// router.get("/addFavorites/:movie",function(req,res){
  
//     db.Movie.findOne({
//         where:{
//             id:req.params.id,
//             movieTitle: req.params.movieTitle,
//             moviePoster:req.params.moviePoster,
//             moviePlot:req.params.moviePlot,
//             movieGenre:req.params.movieGenre,
//             movieYear:req.params.movieYear
//         },
//         raw:true,

       
//     }).then(response=>{
//         console.log(response)
//         res.send(response)
//     }).catch(err=>{
//         res.json(err)
//     });
// });


module.exports=router;