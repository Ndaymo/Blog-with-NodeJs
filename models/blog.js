const mongoose= require ('mongoose');
const Schema= mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    timeToPrepare:{
        type: String,
        required: true
    },
    listOfSteps: {
        type: Array
    }
},{timestamps: true});

const Recipe= mongoose.model('Recipes', recipeSchema);
module.exports= Recipe;