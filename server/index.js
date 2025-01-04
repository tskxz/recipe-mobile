import express from "express";
import recipes from "./data/recipes.js";
import cors from "cors"
import Receita from "./models/Receita.js";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';

dotenv.config();

connectDB();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) =>{
    res.send('API a rodar!')
})

app.get('/api/recipes', async (req, res) => {
    const recipes = await Receita.find({})
    res.json(recipes)
})

app.get('/api/my_recipes', (req, res) => {
    const recipe = recipes.filter(e => e.user === "utilizador1");
    res.json(recipe)
})

app.post("/api/recipes/publish", async (req, res) => {
    const {
        name, 
        description, 
        time, 
        difficulty, 
        num_people, 
        ingredients, 
        steps,
        image,
    } = req.body

    const newRecipe = new Receita({
        name, 
        description, 
        time, 
        difficulty, 
        num_people, 
        ingredients, 
        steps,
        image,
    })

    const recipeCriado = await newRecipe.save()
    res.json(recipeCriado)
})

app.get("/api/recipes/:id", async (req, res) => {
    const recipe = await Receita.findById(req.params.id)
    res.json(recipe)
})

app.put("/api/recipes/:id", async (req, res) => {
    const recipe = await Receita.findById(req.params.id)
    if(recipe){
       recipe.name = req.body.name || recipe.name
       recipe.description = req.body.description || recipe.description
       recipe.time = req.body.time || recipe.time
       recipe.difficulty = req.body.difficulty || recipe.difficulty
       recipe.num_people = req.body.num_people || recipe.num_people
       recipe.ingredients = req.body.ingredients || recipe.ingredients
       recipe.steps = req.body.steps || recipe.steps
       recipe.image = req.body.image || recipe.imagem
       const recipeUpdated = await recipe.save()
       res.status(200).json({
        _id: recipeUpdated._id,
        name: recipeUpdated.name,
        description: recipeUpdated.description,
        time: recipeUpdated.time,
        difficulty: recipeUpdated.difficulty,
        num_people: recipeUpdated.num_people,
        ingredients: recipeUpdated.ingredients,
        steps: recipeUpdated.steps,
        image: recipeUpdated.image,
       })
    } else {
        res.status(404).json({message: "Receita não encontrada"})
    }
    
})

app.listen(port, () => {
    console.log(`servidor a rodar na porta ${port}`);
})