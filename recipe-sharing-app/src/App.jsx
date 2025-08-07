import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import useRecipeStore from './components/recipeStore';
import './App.css';

function App() {
  const setRecipes = useRecipeStore((state) => state.setRecipes);
  const recipes = useRecipeStore((state) => state.recipes);

  // Initialize filtered recipes when recipes are loaded
  useEffect(() => {
    if (recipes.length > 0) {
      const store = useRecipeStore.getState();
      store.filterRecipes();
    }
  }, [recipes]);

  return (
    <Router>
      <div className="app">
        <header>
          <h1>Recipe Sharing Application</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <div className="app-container">
                <aside className="sidebar">
                  <section className="search-section">
                    <h2>Search Recipes</h2>
                    <SearchBar />
                  </section>
                  
                  <section className="filter-section">
                    <h2>Filters</h2>
                    <FilterPanel />
                  </section>
                  
                  <section className="add-recipe-section">
                    <h2>Add New Recipe</h2>
                    <AddRecipeForm />
                  </section>
                </aside>
                
                <section className="main-content">
                  <RecipeList />
                </section>
              </div>
            } />
            <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
