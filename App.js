//App.js
var express = require("express");
var app = express();

app.set("view engine","ejs");

app.get("/",function(req,res){
     res.render("home");

});

app.get("/about",function(req,res){
    res.render("about");

});
app.get("*",function(req,res){
    res.render("error");

});



// app.get("/", function (req, res) {
//     res.send("Hi there Welcome to the assignment");
// });

// app.get("/speak/:animal", function (req, res) {
//     var A = req.params.animal.toLowerCase();
//     if(A == "pig")
//     {
//         res.send("The pig says 'Oink'");
//     }
//     else if(A=="cow"){
//         res.send("The cow says 'Moo'");
//     }
//     else if(A== "dog"){
//         res.send("The dog says 'Woof Woof'");
//     }
//     else{
//         res.send("Sorry")
//     }
// });
// app.get("/repeat/:stri/:no",function(req,res){
//     var parm = req.params;
//     var str = "";
//     for(let i =0;i<parm.no;i++)
//     {
//         str+=parm.stri+" ";
//     }
//     res.send(str);
// });

// app.get("*",function(req,res){
//     res.send("Sorry page not found");
// })
app.listen(3000, function () {
    console.log("Server Started please proceed to browser");
})