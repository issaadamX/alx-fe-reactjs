import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [cookingTime, setCookingTime] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() === '' || description.trim() === '') return;
    
    const recipe = {
      id: Date.now(),
      title,
      description,
      ingredients: ingredients.split(',').map(ing => ing.trim()).filter(ing => ing),
      cookingTime: cookingTime ? parseInt(cookingTime) : null
    };
    
    addRecipe(recipe);
    setTitle('');
    setDescription('');
    setIngredients('');
    setCookingTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description"
        required
      />
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (comma-separated)"
      />
      <input
        type="number"
        value={cookingTime}
        onChange={(e) => setCookingTime(e.target.value)}
        placeholder="Cooking Time (minutes)"
        min="0"
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;
