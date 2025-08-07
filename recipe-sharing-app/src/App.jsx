import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Recipe Sharing Application</h1>
      </header>
      <main>
        <section>
          <h2>Add New Recipe</h2>
          <AddRecipeForm />
        </section>
        <section>
          <h2>Recipe List</h2>
          <RecipeList />
        </section>
      </main>
    </div>
  );
}

export default App;
