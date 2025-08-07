import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  selectedIngredients: [],
  maxCookingTime: null,
  
  // Basic CRUD operations
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, newRecipe] 
  })),
  
  setRecipes: (recipes) => set({ 
    recipes,
    filteredRecipes: recipes 
  }),
  
  updateRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ),
  })),
  
  deleteRecipe: (recipeId) => set((state) => ({
    recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
  })),
  
  // Search and filtering
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setSelectedIngredients: (ingredients) => set({ selectedIngredients: ingredients }),
  
  setMaxCookingTime: (time) => set({ maxCookingTime: time }),
  
  // Advanced filtering logic
  filterRecipes: () => set((state) => {
    let filtered = state.recipes;
    
    // Filter by search term (title and description)
    if (state.searchTerm) {
      const searchTerm = state.searchTerm.toLowerCase();
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        (recipe.ingredients && recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm)
        ))
      );
    }
    
    // Filter by selected ingredients
    if (state.selectedIngredients.length > 0) {
      filtered = filtered.filter(recipe => 
        state.selectedIngredients.every(ingredient => 
          recipe.ingredients && recipe.ingredients.some(recipeIngredient => 
            recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
          )
        )
      );
    }
    
    // Filter by cooking time
    if (state.maxCookingTime) {
      filtered = filtered.filter(recipe => 
        recipe.cookingTime && recipe.cookingTime <= state.maxCookingTime
      );
    }
    
    return { filteredRecipes: filtered };
  }),
  
  // Clear all filters
  clearFilters: () => set({ 
    searchTerm: '', 
    selectedIngredients: [], 
    maxCookingTime: null,
    filteredRecipes: get().recipes 
  }),
}));

export default useRecipeStore;
