import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const EditRecipeForm = ({ recipe, onClose }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() === '' || description.trim() === '') return;
    
    updateRecipe({
      ...recipe,
      title,
      description
    });
    
    setIsEditing(false);
    if (onClose) onClose();
  };

  const handleCancel = () => {
    setTitle(recipe.title);
    setDescription(recipe.description);
    setIsEditing(false);
    if (onClose) onClose();
  };

  if (!isEditing) {
    return (
      <button onClick={() => setIsEditing(true)} className="edit-button">
        Edit Recipe
      </button>
    );
  }

  return (
    <div className="edit-recipe-form">
      <h3>Edit Recipe</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <div className="form-actions">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;
