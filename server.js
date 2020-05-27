var express=require("express");
var session=require("express-session")
var passport=require("./config/passport")

var PORT=process.env.PORT || 8080;

var app=express();
 
var db=require("./models");

app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


var router=require("./routes/api-routes.js");
var route=require("./routes/userauth.js");
var routes=require("./routes/userpassport");

app.use(router);
app.use(route);
app.use(routes);

//{force:true}
db.sequelize.sync().then(function(){
    app.listen(PORT, function() {
        // Log (server-side) when our server has started
        console.log("Server listening on: http://localhost:" + PORT);
      });
});
    
  