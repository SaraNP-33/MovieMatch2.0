console.log("loginevent.js loaded")
$("#login_btn").on("click", function(event){
    event.preventDefault();
    console.log("button clicked");

    let user ={
       email: $("#email").val().trim(),
       password: $("#pass").val().trim()
     
    }
   $.ajax({
       url:"/",
       type:"POST",
       data:user
   }).then(function(conf){
      console.log(conf)
   })

});

console.log("loginevent.js loaded")
$("#register_btn").on("click", function(event){
    event.preventDefault();
    console.log("button clicked");

   $.ajax({
       url:"/",
       type:"POST",
      
   }).then(function(conf){
      console.log(conf)
      location.href="/register";
   })

});