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
        <h5 class="modal-title" id="title" data-title="${oneMovie.Title}">${oneMovie.Title}</h5>
        </div>
        <div class="modal-body">
        <img id="poster" data-poster="${oneMovie.Poster}"src=${oneMovie.Poster}>
        <p id="year" data-year="${oneMovie.Year}">${oneMovie.Year}</p>
        <p id="genre" data-genre="${oneMovie.Genre}">${oneMovie.Genre}</p>
        <p id="plot" data-plot="${oneMovie.Plot}">${oneMovie.Plot}</p>
        <div class="modal-footer">
        <button type="button" id="Add" class="btn btn-primary" data-addMovie=${oneMovie}>Add</button>
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
    var title=$("#title").attr("data-title")
    var year=$("#year").attr("data-year")
    var poster=$("#poster").attr("data-poster")
    var genre=$("#genre").attr("data-genre")
    var plot=$("#plot").attr("data-plot")
    console.log(poster)
    console.log(year)
    console.log(title)
    console.log(genre)
    console.log(plot)
 
 var newMovie={
     movieTitle:title,
     moviePoster:poster,
     movieYear:year,
     movieGenre:genre,
     moviePlot:plot
 }
 console.log(newMovie)

 $.post("/addFavorites",newMovie)
 .then(function(data){
     console.log(data)
     
 })
});

})