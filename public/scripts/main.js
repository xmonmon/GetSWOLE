// $(function() {

//     $.get("/api/users", function(data){
//         console.log(data)
//         if (data == null){
//             console.log("user not logged in")
//             } else {
//             console.log("user logged in")
//         }
//     });

//     $('#signup-form').submit(function(e) {
//         e.preventDefault();
//         console.log("you just clicked me");
        
//         var user = {
//             email: $('#signup-email').val(),
//             password: $('#singup-password').val() 
//         };

//         $.post("/api/users", user, function(data){
//             console.log(data)
//             //SUCCESS

//         }).fail(function(data){
//             //ERROR
//         });

//     });

//     $('#login-form').submit(function(e) {
//         e.preventDefault();
//         console.log("you just clicked me");
        
//         var user = {
//             email: $('#login-email').val(),
//             password: $('#login-password').val() 
//         };

//         $.post("/api/users", user, function(data){
//             console.log(data)
//             // SUCCESS
//         }).fal(function(data){
//             // ERROR
//         });
//     });

// });