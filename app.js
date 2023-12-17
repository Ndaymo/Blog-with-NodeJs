const recipes = require('./recipes.js')
const express= require('express');
const dotenv = require('dotenv');
dotenv.config()
const app=express();
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const blogRoutes = require('./routing/blogRoutes.js')


app.set('view engine', 'ejs');
app.set('views', 'views'); //views is also a folder

const dbURI = 'mongodb+srv://itsndaymo:learnDBWeka101@cluster0.c6d0ppn.mongodb.net/Foodblog?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err))

//console.log(process.env.API_KEY);

//Using middlewares and static files like css
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));

//Blog routes
app.use(blogRoutes);


app.get("/", (req,res) =>{

   res.redirect('/all-blogs');
});



app.get("/about", (req,res) =>{
    res.render('about', {title:'About'});
});

app.get("/contact", (req,res) =>{
    res.render('contact', {title:'Contact'});
});



app.use((req,res) =>{
    res.status(404).render('404', {title:'404'});
});


