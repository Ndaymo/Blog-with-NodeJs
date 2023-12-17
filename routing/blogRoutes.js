const express = require('express');
const routing= express.Router();
const Recipe= require('./recipes.js');


routing.get('/all-blogs', (req, res) => {
    Recipe.find().sort({createdAt:-1})
    .then((result)=>{
res.render('index', {title:'Home', recipes:result})
    }).catch((err)=>{
        console.log(err);
    })
    
});

routing.post('/blogs',(req,res)=>{
    const blog = new Recipe(req.body)
    blog.save()
    .then((result) => {
        res.redirect('/all-blogs');
    }).catch((err)=>{
        console.log(err);
    })
})



routing.get("/blogs/create", (req,res) =>{
   
    res.render('create', {title:'New Blog'});
});

//dishes by Id 

routing.get('/blogs/:id', (req,res)=>{
    const id= req.params.id;
    Recipe.findById(id)
    .then((result)=>{
        res.render('details', { recipe:result, title: 'Recipe details'})
    }).catch((err)=>{
        console.log(err)
    })
   
  });

//delete a dish blog by Id 
routing.delete('/blogs/:id', (req,res) => {
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

module.exports= routing;