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
             var p = $("<p>");
            var resultsDiv = $("<div>")
            var title = $("<h3>").text(res.Title);
            var actors = $("<p>").text(res.Actors);
            var year = $("<p>").text(res.Year);
            var plot = $("<p>").text(res.Plot);
            // var poster = $("<img>").src(data.poster);
            var poster = $("<img>");
            poster.attr("src", res.Poster);
            p.append(title, actors, year, plot);
            resultsDiv.append(poster);
            resultsDiv.append(p);
          
            $("#output").prepend(resultsDiv);
    });
    


});
});