import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: [],
  recommendations: [],
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
  
  // Favorites functionality
  addFavorite: (recipeId) => set((state) => ({
    favorites: [...state.favorites, recipeId]
  })),
  
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  
  toggleFavorite: (recipeId) => set((state) => {
    const isFavorite = state.favorites.includes(recipeId)
    if (isFavorite) {
      return {
        favorites: state.favorites.filter(id => id !== recipeId)
      }
    } else {
      return {
        favorites: [...state.favorites, recipeId]
      }
    }
  }),
  
  // Recommendations functionality
  generateRecommendations: () => set((state) => {
    if (state.favorites.length === 0) {
      // If no favorites, recommend random recipes
      const shuffled = [...state.recipes].sort(() => 0.5 - Math.random())
      return { recommendations: shuffled.slice(0, 5) }
    }
    
    // Get favorite recipes
    const favoriteRecipes = state.recipes.filter(recipe => 
      state.favorites.includes(recipe.id)
    )
    
    // Extract common ingredients from favorites
    const favoriteIngredients = new Set()
    favoriteRecipes.forEach(recipe => {
      if (recipe.ingredients) {
        recipe.ingredients.forEach(ingredient => {
          favoriteIngredients.add(ingredient.toLowerCase())
        })
      }
    })
    
    // Find recipes with similar ingredients
    const recommendations = state.recipes.filter(recipe => {
      if (state.favorites.includes(recipe.id)) return false // Don't recommend favorites
      
      if (recipe.ingredients) {
        const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase())
        const commonIngredients = recipeIngredients.filter(ing => 
          favoriteIngredients.has(ing)
        )
        return commonIngredients.length > 0
      }
      return false
    })
    
    // Sort by number of matching ingredients and limit to 5
    const sortedRecommendations = recommendations
      .sort((a, b) => {
        const aIngredients = a.ingredients?.map(ing => ing.toLowerCase()) || []
        const bIngredients = b.ingredients?.map(ing => ing.toLowerCase()) || []
        
        const aMatches = aIngredients.filter(ing => favoriteIngredients.has(ing)).length
        const bMatches = bIngredients.filter(ing => favoriteIngredients.has(ing)).length
        
        return bMatches - aMatches
      })
      .slice(0, 5)
    
    // If no recommendations based on ingredients, recommend popular recipes
    if (sortedRecommendations.length === 0) {
      const shuffled = [...state.recipes]
        .filter(recipe => !state.favorites.includes(recipe.id))
        .sort(() => 0.5 - Math.random())
      return { recommendations: shuffled.slice(0, 5) }
    }
    
    return { recommendations: sortedRecommendations }
  }),
  
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
}))

export default useRecipeStore
