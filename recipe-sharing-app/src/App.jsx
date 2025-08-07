import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Recipe Sharing Application</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <section>
                  <h2>Add New Recipe</h2>
                  <AddRecipeForm />
                </section>
                <section>
                  <h2>Recipe List</h2>
                  <RecipeList />
                </section>
              </>
            } />
            <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
