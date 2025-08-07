import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import useRecipeStore from './store/recipeStore';
import './App.css';

function App() {
  const setRecipes = useRecipeStore((state) => state.setRecipes);
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);

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
          <nav style={{ marginBottom: '20px' }}>
            <Link to="/" style={{ marginRight: '15px', color: '#2ed573', textDecoration: 'none' }}>
              Home
            </Link>
            <Link to="/favorites" style={{ marginRight: '15px', color: '#2ed573', textDecoration: 'none' }}>
              My Favorites ({favorites.length})
            </Link>
            <Link to="/recommendations" style={{ color: '#2ed573', textDecoration: 'none' }}>
              Recommendations
            </Link>
          </nav>
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
                  
                  <section className="favorites-section">
                    <h2>Quick Access</h2>
                    <Link to="/favorites" className="quick-link">
                      View My Favorites ({favorites.length})
                    </Link>
                  </section>
                </aside>
                
                <section className="main-content">
                  <RecipeList />
                </section>
              </div>
            } />
            <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
            <Route path="/favorites" element={<FavoritesList />} />
            <Route path="/recommendations" element={<RecommendationsList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
