import { createRecipe } from "./recipes"
import { setFilters } from "./filters"
import {renderRecipes } from "./view"


// Render all the recipes
renderRecipes()

// Create a new recipe
document.querySelector('#create-recipe').addEventListener('click',  (e) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

// Search recipes
document.querySelector("#search-recipe").addEventListener("input", (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderRecipes()
})



window.addEventListener("storage", (e) => {
    if(e.key === "recipes"){
        renderRecipes()
    }
})