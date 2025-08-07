import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div className="recipe-list">
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : (
        recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <Link to={`/recipe/${recipe.id}`} className="view-details-link">
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
