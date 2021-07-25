const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = 7700;
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const assers = require('assert');
const connectdb = require('./database/connectdb');
//link yönetimi
const _ = require("lodash");

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const projectContect = "You can use the buttons below to see my projects on github.";
const aboutMeContent = ""

dotenv.config({
  path: "./config/env/config.env"
});

connectdb();


// ARTICLE SCHEMA //

const schema = mongoose.Schema({
    category: {
      type: String,
      require: true
    },
    title: {
      type: String,
      require:true
    },
    content: {
      type:String,
      require:true,
    },
    summary:{
      type:String,
      require:true
    }
});
const Article = mongoose.model("Article",schema);
const allArticles = Article.find({});

app.get("/", function(req,res){
  Article.find({}, function(err,articles) {
    res.render('home',{
      articleList: articles,
      aboutMe: aboutMeContent,
    });
  });

});
//Postların Route Yönetimi

//Play with Collections Test
app.get("/find",function(req,res){
  Article.findOne({title: 'Microsoft Server'}).then((articles) => {
  res.send(articles);
});
});
app.get('/articles/:articleTitle', function(req,res){
  const article = req.params.articleTitle;
  Article.findOne({title: req.params.articleTitle}, function(err,makale){
    if(makale){
      res.render("articles",{makale: makale});
    } else {
      res.send("Makale Bulunamadı");
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

    const newArticle = new Article({
        category: req.body.category,
        title: req.body.title,
        content: req.body.content,
        summary: req.body.summary
    });
    newArticle.save();
    res.redirect("/");
});

app.get("/erdem",function(req,res){
  res.send("erdem");
});



app.listen(port, () => {
    console.log(`APP work on ${port}`);
});
