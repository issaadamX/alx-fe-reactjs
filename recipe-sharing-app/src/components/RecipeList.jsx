import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const recipes = useRecipeStore((state) => state.recipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const selectedIngredients = useRecipeStore((state) => state.selectedIngredients);
  const maxCookingTime = useRecipeStore((state) => state.maxCookingTime);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  // Apply filters whenever relevant state changes
  useEffect(() => {
    filterRecipes();
  }, [recipes, searchTerm, selectedIngredients, maxCookingTime, filterRecipes]);

  const hasActiveFilters = searchTerm || selectedIngredients.length > 0 || maxCookingTime;

  return (
    <div className="recipe-list">
      <div className="recipe-list-header">
        <h2>Recipes</h2>
        {hasActiveFilters && (
          <p className="filter-info">
            Showing {filteredRecipes.length} of {recipes.length} recipes
          </p>
        )}
      </div>
      
      {recipes.length === 0 ? (
        <p className="empty-state">No recipes yet. Add your first recipe!</p>
      ) : filteredRecipes.length === 0 ? (
        <div className="empty-state">
          <p>No recipes match your current filters.</p>
          <p>Try adjusting your search terms or clearing filters.</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p className="recipe-description">{recipe.description}</p>
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className="recipe-ingredients">
                  <strong>Ingredients:</strong>
                  <span>{recipe.ingredients.slice(0, 3).join(', ')}
                    {recipe.ingredients.length > 3 && ` +${recipe.ingredients.length - 3} more`}
                  </span>
                </div>
              )}
              {recipe.cookingTime && (
                <div className="recipe-cooking-time">
                  <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
                </div>
              )}
              <Link to={`/recipe/${recipe.id}`} className="view-details-link">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
