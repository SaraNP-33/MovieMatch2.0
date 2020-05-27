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
            // var poster = $("<img>").src(data.poster);
            var poster = $("<img>");
            poster.attr("src", movie.moviePoster);
            p.append(title, year, plot);
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
        location.href="/addFavorites"
    }).fail(function(err){
        console.log(err)
    })
})
});