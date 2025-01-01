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

app.get('/api/recipes', (req, res) => {
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
        steps
    } = req.body

    const newRecipe = new Receita({
        name, 
        description, 
        time, 
        difficulty, 
        num_people, 
        ingredients, 
        steps,
    })

    const recipeCriado = await newRecipe.save()
    res.json(recipeCriado)
})

app.get("/api/recipes/:id", (req, res) => {
    const recipe = recipes.find(e => e._id === req.params.id);
    res.json(recipe)
})


app.listen(port, () => {
    console.log(`servidor a rodar na porta ${port}`);
})