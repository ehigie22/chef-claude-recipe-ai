import React, { useState } from 'react'
import IngredientsList from './IngredientsList'
import ClaudeRecipe from './ClaudeRecipe'


function ChefClaude(){
    const [ingredients, setIngredients] = useState([])
    const [recipeShown, setRecipeShown] = useState(false)
    const [ingredientInput, setIngredientInput] = useState("")


    function toggleRecipeShown(){
        setRecipeShown(prevShown => !prevShown)
    }

    // function addIngredient(formData) {
    //     const newIngredient = formData.get("ingredient")
    //     setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    // }

    function addIngredient(e) {
        e.preventDefault ()
        const formData = new FormData(e.target)
        const newIngredient = formData.get("ingredient")

        if (newIngredient !== "" && !ingredients.includes(newIngredient)){
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
            setIngredientInput("")
        }


    }

    function deleteIngredient(index) {
        setIngredients(prev => prev.filter((_, i) => i !== index))
    }

    return(
        <div>
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input 
                type="text"
                placeholder="e.g. grape"
                aria-label="Add ingredient"
                name="ingredient"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                />
                <button className="add-ingredient">Add Ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList 
            ingredients={ingredients}
            toggleRecipeShown={toggleRecipeShown}
            deleteIngredient={deleteIngredient}
            recipeShown={recipeShown}
            />}

            {recipeShown && <ClaudeRecipe 
            ingredients={ingredients}
            />}
        </main>
        </div>  
    )
}
export default ChefClaude
