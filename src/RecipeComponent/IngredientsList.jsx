
function IngredientsList(props){
    const ingredientsListItems = props.ingredients.map((ingredient, index) => (
    <li key={index} className="ingredient-item">
        <span className="ingredient-text">{ingredient}</span>
        <button
        type="button"
        className="delete-btn"
        onClick={() => props.deleteIngredient(index)}
        aria-label={`Delete ${ingredient}`} 
        >
            ❌
        </button>
    </li>

    ))
    return (
         <section>
                <h2>Ingredients on hand</h2>
                <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
                {props.ingredients.length > 3 && 
                <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.toggleRecipeShown}>
                        {props.recipeShown ? "Hide recipe" : "Get a recipe"}</button>
                </div>}
            </section>
    )
}
export default IngredientsList