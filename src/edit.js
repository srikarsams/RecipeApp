import { initializeEditPage } from "./view"
import { updateRecipe, removeRecipe } from "./recipes"

const recipeId = location.hash.substring(1)
const recipeTitleElement = document.querySelector("#recipe-title")
const recipeBodyElement = document.querySelector("#recipe-body")

initializeEditPage(recipeId)

recipeTitleElement.addEventListener("input", (e) => {
    const recipe = updateRecipe(recipeId, {
        title: e.target.value
    })
})

recipeBodyElement.addEventListener("input", (e) => {
    const recipe = updateRecipe(recipeId, {
        process: e.target.value
    })
})

document.querySelector("#remove-recipe").addEventListener("click", () => {
    removeRecipe(recipeId)
    location.assign("/index.html")
})

document.querySelector("#add-ingredient").addEventListener("submit", (e) =>{
    e.preventDefault()
    if(e.target.elements.ingredientItem.value.trim() !== ""){
        updateRecipe(recipeId, {
            item: e.target.elements.ingredientItem.value.trim()
        })
        initializeEditPage(recipeId)
        e.target.elements.ingredientItem.value = ""
    }else{
        alert("Please enter the ingredient")
    }
})

window.addEventListener("storage", (e) => {
    if(e.key === "recipes"){
        initializeEditPage(recipeId)
    }
})

