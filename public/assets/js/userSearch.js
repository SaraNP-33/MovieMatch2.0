$(document).ready(()=>{
    uri = "http://localhost:8080/"

    $("#run").on("click",(event)=>{
        
        var text=$("#movies").val().trim();

        $.ajax({
            url:uri + "user/movie/" +text,
            method:"GET"
            // success: function(res){
            //     console.log(res)
            //     let movies=res;
            //     console.log(movies);
            //     let output=" ";

            //     $.each(movies,(index, movie)=>{
            //         output+=`
            //         <div src="${movie.Poster}"</div>
            //         <h3>${movie.Title}</h3>
            //         <h5>${movie.Genre}</h5>
            //         <h5>${movie.Year}</h5>
            //         <p>${movie.Plot}</p>
                    
            //         `
            //     });
            //     $("output").html(output);
            // }
        // });
    }).then(function(res){
        console.log(res)
        var movie= res[0]
        $("#output").empty();
             var p = $("<p>");
            var resultsDiv = $("<div>")
            var title = $("<h3>").text(movie.movieTitle);
           
            var year = $("<p>").text(movie.movieYear);
            var plot = $("<p>").text(movie.moviePlot);
            var genre=$("<p>").text(movie.movieGenre)
            var poster = $("<img>");
            poster.attr("src", movie.moviePoster);
            p.append(title, year, plot, genre);
            resultsDiv.append(poster);
            resultsDiv.append(p);
          
            $("#output").prepend(resultsDiv);

            var button= $("<button>").attr({"data-movieid":movie.id,"id":'Add'}).text("ADD to Favorites")
            $("#output").append(button)
    });
    


});

$(document).on("click","#Add", function(event){
    var movieid=$("#Add").data("movieid")
    console.log(movieid)
    $.ajax({
        url:"/addFavorites/"+ movieid,
        method:"POST"
        
    }).then(function(response){
        console.log(JSON.stringify(response))
        location.href="/addFavorites/"
        var movie=response[0];                                          
                                                                            
        var p = $("<p>");
        var resultsDiv= $("<div>")
       var title = $("<h3>").text(movie.movieTitle);
       var year = $("<p>").text(movie.movieYear);
       var plot = $("<p>").text(movie.moviePlot);
       var genre=$("<p>").text(movie.movieGenre)
       var poster = $("<img>");
       poster.attr("src", movie.moviePoster);
       p.append(title, year, plot, genre);
       resultsDiv.append(poster);
       resultsDiv.append(p);
     
       $("#faves").prepend(movie.moviePoster);


    }).fail(function(err){
        console.log(err)
    });

 
})

});

$.get("/addFavorites", function(data){
    console.log(data)
    for(var i=0;i<data.length;i++){
        var movies=$("<div>")

        movies.addClass("movie")

        movies.attr("id", "moviedb", + i)

        $("#faves").append(movies);

        $("#moviedb" +i).append("<h3>"+ (i+1)+" ." +data[i].movieTitle+"</h3>")
        $("#moviedb" +i).append("<p>"+  +data[i].movieYear+ "</p>")
        $("#moviedb" +i).append("<p>"+  +data[i].movieGenre+ "</p>")
        $("#moviedb" +i).append("<p>"+  +data[i].moviePlot+ "</p>")

    }
})