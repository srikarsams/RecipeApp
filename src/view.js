import { getRecipes, updateRecipe, removeIngredient } from "./recipes";
import { getFilters } from "./filters";



// Render recipes to the DOM
const renderRecipes = () => {
    const filters = getFilters()
    const recipes = getRecipes()
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    const recipesEl = document.querySelector("#recipes")
    recipesEl.innerHTML=""
    if (filteredRecipes.length > 0){
        filteredRecipes.forEach((recipe) => {
            const p = generateRecipeDOM(recipe)        
            recipesEl.appendChild(p)
        })
    }else{
        recipesEl.innerHTML="<p class='empty-message'>No recipes to display</p>"
    }
}

// Generate the DOM structure for a recipe

const generateRecipeDOM = (recipe) => {
    const div = document.createElement("a")
    const p = document.createElement("p")
    const status = document.createElement('p')
    let statusMessage = ""
    // setup the text span
    
    if (recipe.title.length > 0){
        p.textContent = recipe.title
    }else{
        p.textContent = "Unnamed recipe"
    }
    div.appendChild(p)
    p.classList.add("list-item__title")
    // Setup the link
    div.href=`/edit.html#${recipe.id}`
    div.classList.add("list-item")

    if (recipe.ingredients.length > 0){
        let count = 0;
        recipe.ingredients.forEach((ingredient) => {
            if (ingredient.exists){
                count++
            }
        })
        if(count === recipe.ingredients.length){
            statusMessage = "You have all ingredients"
        }else if(count === 0){
            statusMessage = "You have no ingredients"
        }else if (count < recipe.ingredients.length) {
            statusMessage = "You have some of the ingredients"
        }
    }else{
        statusMessage = "You've not listed the ingredients yet"
    }
    // setup status message
    status.textContent = statusMessage
    status.classList.add('list-item__subtitle')
    div.appendChild(status)
    return div
}

const initializeEditPage = (recipeId) => {
    const recipeTitleElement = document.querySelector("#recipe-title")  
    const recipeBodyElement = document.querySelector("#recipe-body")
    const ingredientsElement = document.querySelector("#ingredients")
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    
    if(!recipe){
        location.assign("/index.html")
    }
    
    recipeTitleElement.value = recipe.title
    recipeBodyElement.value = recipe.process
    ingredientsElement.innerHTML =""
    if(recipe.ingredients.length > 0){
        recipe.ingredients.forEach((ingredient) => {
            const ingredientElement = generateIngredientDOM(ingredient, recipeId)
            ingredientsElement.appendChild(ingredientElement)
        })
    }
}

const generateIngredientDOM = (ingredient, recipeId) => {
    const div = document.createElement("label")
    const containerEl = document.createElement("div")
    const checkbox = document.createElement("input")
    const button = document.createElement("button")
    button.innerHTML = `<img src="./images/delete_white_36x36.png" alt="">`
    button.classList.add("button-ingred-del")
    button.classList.add("button_hp")
    button.addEventListener("click",() => {
        removeIngredient(recipeId, ingredient.id)
        initializeEditPage(recipeId)
    })
    checkbox.setAttribute("type", "checkbox")
    checkbox.checked = ingredient.exists
    checkbox.addEventListener("change",() => {
        updateRecipe(recipeId,{
            id: ingredient.id
        })
        initializeEditPage(recipeId)
    })
    div.classList.add("list-item")
    div.classList.add("ingred-list-item")
    if(checkbox.checked){
        div.classList.add("green")  
    }
    const p = document.createElement("span")
    p.textContent = ingredient.item
    p.classList.add("ingred-span")
    containerEl.appendChild(checkbox)
    containerEl.classList.add('list-item__container')
    containerEl.appendChild(p)
    div.appendChild(containerEl)
    div.appendChild(button)
    return div
}

export {  generateRecipeDOM, renderRecipes, initializeEditPage }