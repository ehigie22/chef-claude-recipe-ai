import React, { useEffect, useState, useRef } from "react"
import OpenAI from "openai"

const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

function ClaudeRecipe({ ingredients }) {
    const [recipe, setRecipe] = useState("")
    const [loading, setLoading] = useState(true)
    const recipeSection = useRef(null)

    useEffect(() => {
        async function getRecipe() {
            setLoading(true)
            try {
                const prompt = `Create a detailed, easy-to-follow recipe using these ingredients: 
                ${ingredients.join(",")}. Include the title, ingredient List, and cooking steps.`

                const response = await client.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [
                        {role: "system", content: "You are a helpful AI chef that writes recipes."},
                        {role: "user", content: prompt}
                    ]
                })
                const cleanedRecipe = response.choices[0].message.content
                .replace(/#+\s?/g, "")
                .replace(/\*\*(.*?)\*\*/g, "$1")
                .replace(/_/g, ""); 

                setRecipe(cleanedRecipe)

            } catch (error) {
                console.error("Error fetching recipe", error)
                setRecipe("Sorry, something went wrong while generating your recipe")
            
            } finally {
                setLoading(false)
            }
        }

        getRecipe()
    }, [ingredients])

     useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])



    return (
        <section className="recipe-section" ref={recipeSection}>
            <h2 className="recipe-header">Chef Claude Recommends: </h2>
            {loading ? (
                <p className="loading-text">Generating your recipe...</p>
            ) : (

                <article className="recipe-box">
                    <p className="recipe-text" style={{whitespace:"pre-line"}}>{recipe}</p>
                </article>
            )
            }
        </section>
    )
}
export default ClaudeRecipe