console.log("loginevent.js loaded")
$("#login_btn").on("click", function(event){
    event.preventDefault();
    console.log("button clicked");

    let user ={
       email: $("#email").val().trim(),
       password: $("#password").val().trim()
     
    }
   $.ajax({
       url:"/",
       type:"POST",
       data:user
   }).then(function(conf){
      console.log(conf)
      location.href="/welcomepage"
   })

});

console.log("loginevent.js loaded")
$("#register_btn").on("click", function(event){
    event.preventDefault();
    console.log("button clicked");

   $.ajax({
       url:"/",
       type:"GET",
      
   }).then(function(conf){
      console.log(conf)
      location.href="/register"
   })

});

$("#sign-up").on("click", function(event){
    event.preventDefault();
    console.log("button clicked");

    let user ={
       email: $("#email").val().trim(),
       password: $("#password").val().trim()
     
    }
   $.ajax({
       url:"/register",
       type:"POST",
       data:user
   }).then(function(conf){
      console.log(conf)
      location.href="/user/movie"
   })

});