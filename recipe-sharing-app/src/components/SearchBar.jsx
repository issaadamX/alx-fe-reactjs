import React, { useState, useEffect } from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);
  const clearFilters = useRecipeStore((state) => state.clearFilters);

  // Debounced search to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localSearchTerm);
      filterRecipes();
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, setSearchTerm, filterRecipes]);

  const handleClear = () => {
    setLocalSearchTerm('');
    clearFilters();
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search recipes by title, description, or ingredients..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          className="search-input"
        />
        {localSearchTerm && (
          <button 
            className="clear-search-btn" 
            onClick={handleClear}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
