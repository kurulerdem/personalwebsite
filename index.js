const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = 7700;
const _ = require("lodash");

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const projectContect = "You can use the buttons below to see my projects on github.";
const aboutMeContent = "I am a fresh computer engineer who has continued his business life and education life together, highly motivated and hungry for continuous learning. and worked in the IT department of Turkey's largest airport for 4 years at Istanbul Ataturk Airport. I can easily get out of my comfort zone to learn new things or technologies.";

let posts = [];


app.get("/", function(req,res){
    res.render("home",{
        aboutMe: aboutMeContent,
        posts: posts,

    });
});
//Postların Route Yönetimi
app.get('/posts/:postTitle', function(req,res){

  const requesturl = _.lowerCase(req.params.postTitle);
  posts.forEach(function(element){
    const title = _.lowerCase(element.title);
    //request 'den gelen url in array'de olup olmadığını kontrol ediyoruz.
    if(title === requesturl) {
      res.render("posts",{
        title:element.title,
        category: element.category,
        article: element.article
      })
    }
  });

});

app.get("/projects", function(req,res){
    res.render("projects",{projectTitle: projectContect});
});

app.get("/about",function(req,res){
    res.render("about",{aboutMe: aboutMeContent});
});

app.get("/compose",function(req,res){
    res.render("compose");

});

app.post("/compose" , function(req,res){
    const post = {
        title: req.body.postTitle,
        category: req.body.category,
        article: req.body.article
    };
    posts.push(post);
    res.redirect("/");
});



app.listen(port, () => {
    console.log(`APP work on ${port}`);
});
