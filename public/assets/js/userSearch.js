// const session = require("express-session");

$(document).ready(()=>{
    
    // event to allow user to make a general search for movies using key words
    $("#run").on("click",(event)=>{
        
        var text=$("#movies").val().trim();


        $.ajax({
            url: "/user/movie/" +text,
            method:"GET",
           
    }).then(function(res){
        console.log(res)
        // var movie= res[0]
        $("#output").empty();
        var movie=res.Search;
        console.log(movie)
       
        var output =" ";

        for (var i=0;i<movie.length;i++){
            output+=`
            <div class=col-md-4 id=movies>
            <img src ="${movie[i].Poster}">
            <h3>${movie[i].Title}</h3>
            <p>${movie[i].Year}</p>
            <button type="button" id="${i}" class="btn btn-danger oneMovie" data-movieid="${movie[i].imdbID}">Movie Details </button>
            </div>
            `
        }
        $("#output").html(output);
        
    });
//make movie pop in a modal
   
$(document).on("click", ".oneMovie", function(event){
    var movieid=$(this).data("movieid")

    $.ajax({
        url:"/movies/"+ movieid,
        method:"GET"

    }).then(result=>{
        var oneMovie=result
        console.log(oneMovie)
        console.log(oneMovie.Title)
    
        var output=`
        <div class="modal-header justify-content-center">
        <h5 class="modal-title">${oneMovie.Title}</h5>
        </div>
        <div class="modal-body">
        <img src=${oneMovie.Poster}>
        <p>${oneMovie.Year}</p>
        <p>${oneMovie.Genre}</p>
        <p>${oneMovie.Plot}</p>
        <div class="modal-footer">
        <button type="button" id="Add" class="btn btn-primary" data-addMovie=${result}>Add</button>
        <button type="button" id="close"class="btn btn-secondary" data-dismiss="modal">Close</button>
          
        `
        
        $(".modal-content").prepend(output);
       
        
        $("#result-modal").modal("toggle");
        
    }).fail(function(err){
        console.log(err)
    })
})

});
//make modal empty everytime we exit out of it
$(document).on("click", "#close", function(event){
    $(".modal-content").empty();
})


//add the movie to the favorites 
$(document).on("click","#Add", function(event){
    var addMovie=$(this).data("addMovie")
    console.log(addMovie)
 
 

});

// $.get("/addFavorites", function(data){
//     console.log(data)
//     for(var i=0;i<data.length;i++){
//         var movies=$("<div>")

//         movies.addClass("movie")

//         movies.attr("id", "moviedb", + i)

//         $("#faves").append(movies);

//         $("#moviedb" +i).append("<h3>"+ (i+1)+" ." +data[i].movieTitle+"</h3>")
//         $("#moviedb" +i).append("<p>"+  +data[i].movieYear+ "</p>")
//         $("#moviedb" +i).append("<p>"+  +data[i].movieGenre+ "</p>")
//         $("#moviedb" +i).append("<p>"+  +data[i].moviePlot+ "</p>")

//     }
})