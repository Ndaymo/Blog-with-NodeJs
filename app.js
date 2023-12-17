const recipes = require('./recipes.js')
const express= require('express');
const dotenv = require('dotenv');
dotenv.config()
const app=express();
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const Recipe= require('./models/blog');



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

app.get("/", (req,res) =>{

   res.redirect('/all-blogs');
});



app.get("/about", (req,res) =>{
    res.render('about', {title:'About'});
});

app.get("/contact", (req,res) =>{
    res.render('contact', {title:'Contact'});
});


app.get('/all-blogs', (req, res) => {
    Recipe.find().sort({createdAt:-1})
    .then((result)=>{
res.render('index', {title:'Home', recipes:result})
    }).catch((err)=>{
        console.log(err);
    })
    
});

app.post('/blogs',(req,res)=>{
    const blog = new Recipe(req.body)
    blog.save()
    .then((result) => {
        res.redirect('/all-blogs');
    }).catch((err)=>{
        console.log(err);
    })
})



app.get("/blogs/create", (req,res) =>{
   
    res.render('create', {title:'New Blog'});
});

//dishes by Id 

app.get('/blogs/:id', (req,res)=>{
    const id= req.params.id;
    Recipe.findById(id)
    .then((result)=>{
        res.render('details', { recipe:result, title: 'Recipe details'})
    }).catch((err)=>{
        console.log(err)
    })
   
  });

//delete a dish blog by Id 
app.delete('/blogs/:id', (req,res) => {
    const id = req.params.id;
    Recipe.findByIdAndDelete(id)
    .then(recipe => {
        if (!recipe) {
            // Handle the case where the recipe with the given ID is not found
            return res.status(404).json({error: 'Recipe not found' });
        }
            // Render the details view with the retrieved recipe
            return res.json({success: true });
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({error: 'Internal server error'});
        })
    .then(result=>{
        res.json({ redirect:'/all-blogs' });
    })
    .catch((err)=> {
        console.log(err);
    })
})


app.use((req,res) =>{
    res.status(404).render('404', {title:'404'});
});


