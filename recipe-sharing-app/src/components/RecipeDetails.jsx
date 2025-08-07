import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(recipeId))
  );

  if (!recipe) {
    return (
      <div className="recipe-details">
        <h2>Recipe Not Found</h2>
        <button onClick={() => navigate('/')}>Back to Recipes</button>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Recipes
      </button>
      
      <h1>{recipe.title}</h1>
      <p className="recipe-description">{recipe.description}</p>
      
      <div className="recipe-actions">
        <EditRecipeForm recipe={recipe} />
        <DeleteRecipeButton recipeId={recipe.id} />
      </div>
    </div>
  );
};

export default RecipeDetails;
