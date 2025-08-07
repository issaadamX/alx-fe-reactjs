import React from 'react';
import useRecipeStore from '../store/recipeStore';

const FavoriteButton = ({ recipeId }) => {
  const favorites = useRecipeStore((state) => state.favorites);
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  
  const isFavorite = favorites.includes(recipeId);

  return (
    <button 
      onClick={() => toggleFavorite(recipeId)}
      className="favorite-button"
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.5rem',
        color: isFavorite ? '#ff4757' : '#ccc',
        transition: 'color 0.3s ease',
        padding: '5px'
      }}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '♥' : '♡'}
    </button>
  );
};

export default FavoriteButton;
