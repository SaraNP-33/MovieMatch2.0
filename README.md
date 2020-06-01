# This App is for Movie Lovers
___

<p align="center">
  <img src="https://github.com/SaraNP-33/MovieMatch/blob/master/public/assets/images/image(2).png">
</p>


___
<ins> **Movie Match** </ins> 

Make new friends based on your movie interests!  

Users are able to search movies and give them a rating!  

Keep a list of movies that you love or would like to recommend to friends. 

Find out what movies your friends love, giving you some good ideas for a Friday night!


<p align="center">
  <img src="/public/assets/images/Popcorn.png">
</p>


___

# Getting Started

This application was a project collaboration. The idea steamed from having the ability of creating communities that loved movies/ shows and be able to share that passion with others. 

When we started we had to think about how our users were going to interact with our app, and what was the end goal of that app. 

So the first step was to create our user stories.

## User Stories

- The user should be able to login and logout of the app with their personal information. As result we should have a login, signup and logout feature with authentication.

+ The user should be able to search for movies/ shows through a search bar. this meant having an external API that have us access to movies/show information for the user to consume.

- The user should be able to add their favorite movies/ shows to their personal page and rate them if they wish to. The app should have the ability to save that information on a database that the user can reference. It also meant having tables that associate to each other so the users can always access the movies/shows they picked personally. 

+ The user should be able to post the info of their favorite movies as well as post or comment with other users in that community. This means that the informations saved on the database by one user can be shared with other users. Post and comments have to be stored in a database as well and be tracked by the user id so we know who "owns" them. 

## Next Step

The next step was to prioritize what to do first. What was going to be our Minimal Viable Product (MVP).
We decided the main priorities were to have the user be able to login/sign up and logout, be able to look for movies/shows, add those to their favorites and rate them. 

In order to achieve this goal we had to decide what technology and resources we were going to use in our app. 

## Installations

We started by deciding what type of database we wanted to use. We chose the Mysql database and used Sequelize to sync our sever to the database. Here were the NPM packages we had to install in order to use this database:

```
npm install mysql2
````

```
npm install sequelize
````

We used the Sequelize CLI version that was installed globally on our machines. This allows to install the Config and Models folders with files containing already a map for the syncing of the databases and how to require the models througout the files with our server routes using the databases. 

```
sequelize init:config
````
```
sequelize init:models
````
We chose to use express as our server. 
```
npm install express
````
We used Passport as the our authentication technology. To make passport work with our app we had to install a few packages. We started with the actual passport package. 

```
npm install passport
````

We had to install another package that allowed us to save information in the database by allowing passport to work with a local strategy

```
npm install passport-local
````

In order to passport to work with our server we had to add a middleware that bridged the gap between the two tecnologies.

```
npm install express-session
````
Finally we also installed middleware to make the passwords that are saved in the database appear hashed (meaning concelled by replacing the letters used with scramble nonsensical symbols).

```
npm install bcryptjs
````

In order for the user to search for movies/shows in the app, we had to use and outside API -OMDB API. To execute the call on that api and bring in the relevant information to the app, we used the axios package.

```
npm install axios
````
## API GETS

When we first started this app we were not sure how we wanted to disply the information of the movie searches. We went to read upon the documentation on OMdB and first decided to go with just the title. 

We quickly realized that this was not going to be efficient since only one movie at the time would show up. So then we decided to look for the movies with the s (search) parameter. This did bring much more options but the information we could display was very limited.

This is how we got to the conclusion that we needed to do a second api call with the information received in the first api call - the IMDB ID. So our second search uses the i parameter (search by ID). 

Here are some snippets of our code where you can see how we call the apis. 

This is the firs one where the user just does a general search. 

router.get("/user/movie/:search" ,function(req,res){
    var search=req.params.search;
    search=search.replace(" ", "%20");

    var uri=`http://www.omdbapi.com/?s=${search}&apikey=trilogy`
    console.log(uri);

    axios.get(uri)
    .then(response=>{
       var movie=response.data;
    
    res.send(movie)
    });

Followed by the second one where we search by ID to get more of the movie details:

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

On the client side, we used a data-attribute to pass the movie Id to the Movie-Details button so when the client clicked on that button the server could get the information and through the second api call give back the right result as can be seen below:

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

___

# Sample Images
 
 ## Here are some images of our app at work. 

 Login: when the user logs in they are taken to the welcome page. 

 ![login](/public/assets/images/login.gif)

Search: From the welcome page the user can click on search and is taken to another page where they can execute that search

![search](/public/assets/images/search.gif)

Movie Details: From the search results, the user can access the movie details by clicking the button below. 

![add](/public/assets/images/add.gif)

logout: If the user choses to logout they can by hitting the logout button

![logout](/public/assets/images/logout.gif)

___

# This App Utlilizes 
- HTML5
+ CSS
- JavaScript
+ Sequelize 
- MySQL
+ JQuery 
- Node.JS
+ Passport.JS
- Passport-Local
+ bcrypt Js
- Express.JS
+ Express Sessions
- Axios 
+ GitHub
- Heroku
___

# Heroky Deployed Link

[Movie Match Live Link](https://lit-beach-03757.herokuapp.com/)

___

## This App is a collaborative effort from 
  - [Sara Neves Pereira](https://www.linkedin.com/in/sara-neves-pereira-8b6509139/)
  + [Hayden Muir](https://www.linkedin.com/in/hayden-muir/)
  - [Jaclyn Hardy](https://www.linkedin.com/in/jaclyn-hardy-07030a19b/)
  + [Steven Reinart](https://www.linkedin.com/in/steven-reinart-43a577121/)
___
