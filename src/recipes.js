import uuidv4 from "uuid/v4"


let recipes= []

// Read existing recipes from localStorage
const getSavedRecipes = () => {
    let recipesJSON = localStorage.getItem("recipes")
    return recipesJSON ? JSON.parse(recipesJSON) : [] 
}

// expose recipes from module
const getRecipes = () => recipes

// Create recipes
const createRecipe = () => {
    const id = uuidv4()
    recipes.push({
        id: id,
        title: "",
        process: "",
        ingredients: []
    })
    saveRecipes()
    return id
}

// save recipes to the localStorage
const saveRecipes = () => {
    localStorage.setItem("recipes", JSON.stringify(recipes))
}

// Remove a recipe from the list
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)
    if (recipeIndex > -1){
        recipes.splice(recipeIndex,1)
        saveRecipes(recipes)
    }   
}


// function for updating recipes

const updateRecipe = (id, updates) => {
    const recipe = recipes.find((recipe) => recipe.id === id)

    if(!recipe) {
        return 
    }

    if (typeof updates.title === "string") {
        recipe.title = updates.title
    }

    if(typeof updates.process === "string") {
        recipe.process = updates.process
    }

    if(updates.id){
        const ingredient = recipe.ingredients.find((ingredient) => ingredient.id === updates.id)
        ingredient.exists = !ingredient.exists
    }

    if(typeof updates.item === "string") {
        recipe.ingredients.push({
            item: updates.item,
            id: uuidv4(),
            exists: false
        })
    }
    saveRecipes()
    return recipe
}


// remove ingredient
const removeIngredient = (recipeId, ingredientId) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    if(!recipe){
        return 
    }
    const ingredient = recipe.ingredients.findIndex((ingred) => ingred.id === ingredientId)
    if(ingredient > -1){
        recipe.ingredients.splice(ingredient, 1)
        saveRecipes()
    }
    
}

recipes = getSavedRecipes();

export { getRecipes, createRecipe, removeRecipe, updateRecipe, removeIngredient }