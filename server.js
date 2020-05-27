var express=require("express");
var path=require("path")

var PORT=process.env.PORT || 8080;

var app=express();
 
var db=require("./models");

app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var router=require("./routes/api-routes.js");

app.use(router);

//{force:true}
db.sequelize.sync().then(function(){
    app.listen(PORT, function() {
        // Log (server-side) when our server has started
        console.log("Server listening on: http://localhost:" + PORT);
      });
});
    
  