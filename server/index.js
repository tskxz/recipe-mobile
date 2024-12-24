import express from "express";
import recipes from "./data/recipes.js";
import cors from "cors"

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

app.get("/api/recipes/:id", (req, res) => {
    const recipe = recipes.find(e => e._id === req.params.id);
    res.json(recipe)
})

app.listen(port, () => {
    console.log(`servidor a rodar na porta ${port}`);
})