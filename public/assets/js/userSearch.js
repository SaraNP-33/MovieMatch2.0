$(document).ready(()=>{
    uri = "http://localhost:8080/"

    $("#run").on("click",(event)=>{
        
        var text=$("#movies").val().trim();

        $.ajax({
            url:uri + "user/movie/" +text,
            type:"GET",
            success: function(res){
                console.log(res)
            }
        });
    });



})