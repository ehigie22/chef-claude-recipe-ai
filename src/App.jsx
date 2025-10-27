import Header from './RecipeComponent/Header'
import ChefClaude from './RecipeComponent/ChefClaude.jsx'

console.log(import.meta.env.VITE_OPENAI_API_KEY)

function App() {

  return( <>
            <Header />
            <ChefClaude />
          </>
   )
}

export default App
