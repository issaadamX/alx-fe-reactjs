import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const FilterPanel = () => {
  const [ingredientInput, setIngredientInput] = useState('');
  const selectedIngredients = useRecipeStore((state) => state.selectedIngredients);
  const maxCookingTime = useRecipeStore((state) => state.maxCookingTime);
  const setSelectedIngredients = useRecipeStore((state) => state.setSelectedIngredients);
  const setMaxCookingTime = useRecipeStore((state) => state.setMaxCookingTime);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);
  const clearFilters = useRecipeStore((state) => state.clearFilters);

  const handleAddIngredient = () => {
    if (ingredientInput.trim() && !selectedIngredients.includes(ingredientInput.trim())) {
      const newIngredients = [...selectedIngredients, ingredientInput.trim()];
      setSelectedIngredients(newIngredients);
      setIngredientInput('');
      filterRecipes();
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    const newIngredients = selectedIngredients.filter(ing => ing !== ingredient);
    setSelectedIngredients(newIngredients);
    filterRecipes();
  };

  const handleCookingTimeChange = (e) => {
    const time = e.target.value ? parseInt(e.target.value) : null;
    setMaxCookingTime(time);
    filterRecipes();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  return (
    <div className="filter-panel">
      <h3>Filters</h3>
      
      {/* Ingredients Filter */}
      <div className="filter-section">
        <label>Ingredients:</label>
        <div className="ingredient-input-group">
          <input
            type="text"
            placeholder="Add ingredient..."
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleAddIngredient}>Add</button>
        </div>
        
        {selectedIngredients.length > 0 && (
          <div className="ingredient-tags">
            {selectedIngredients.map((ingredient) => (
              <span key={ingredient} className="ingredient-tag">
                {ingredient}
                <button 
                  onClick={() => handleRemoveIngredient(ingredient)}
                  className="remove-tag"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Cooking Time Filter */}
      <div className="filter-section">
        <label htmlFor="cooking-time">Max Cooking Time (minutes):</label>
        <input
          id="cooking-time"
          type="number"
          min="0"
          placeholder="Any"
          value={maxCookingTime || ''}
          onChange={handleCookingTimeChange}
        />
      </div>

      {/* Clear Filters */}
      <button onClick={clearFilters} className="clear-filters-btn">
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterPanel;
