import React from 'react';
import useRecipeStore from '../store/recipeStore';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  const favorites = useRecipeStore((state) => 
    state.favorites.map(id => state.recipes.find(recipe => recipe.id === id)).filter(Boolean)
  );
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  if (favorites.length === 0) {
    return (
      <div className="favorites-list">
        <h2>My Favorites</h2>
        <p>You haven't added any recipes to your favorites yet.</p>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <h2>My Favorites</h2>
      <div className="favorites-grid">
        {favorites.map(recipe => (
          <div key={recipe.id} className="favorite-card">
            <Link to={`/recipe/${recipe.id}`}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              {recipe.image && (
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
              )}
            </Link>
            <button 
              onClick={() => removeFavorite(recipe.id)}
              className="remove-favorite-btn"
              style={{
                backgroundColor: '#ff4757',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
