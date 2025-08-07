import React, { useEffect } from 'react';
import useRecipeStore from '../store/recipeStore';
import { Link } from 'react-router-dom';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const favorites = useRecipeStore((state) => state.favorites);

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  if (recommendations.length === 0) {
    return (
      <div className="recommendations-list">
        <h2>Recommended Recipes</h2>
        <p>No recommendations available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="recommendations-list">
      <h2>Recommended For You</h2>
      <div className="recommendations-grid">
        {recommendations.map(recipe => {
          const isFavorite = favorites.includes(recipe.id);
          
          return (
            <div key={recipe.id} className="recommendation-card">
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
                onClick={() => toggleFavorite(recipe.id)}
                className="favorite-btn"
                style={{
                  backgroundColor: isFavorite ? '#ff4757' : '#2ed573',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationsList;
