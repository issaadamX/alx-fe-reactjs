import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddRecipeForm() {
  // State to hold form data
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: ''
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});

  // State to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to show success message after submission
  const [successMessage, setSuccessMessage] = useState('');

  // Common input classes for styling with Tailwind CSS
  const inputClassNames = `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`;

  // Handle input changes and update form data state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for the field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear success message on any input change
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    } else {
      const ingredientsList = formData.ingredients.split('\n').filter(item => item.trim());
      if (ingredientsList.length < 2) {
        newErrors.ingredients = 'Please provide at least 2 ingredients';
      }
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Preparation steps are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      const newRecipe = {
        id: Date.now(), // Simple ID generation
        title: formData.title.trim(),
        summary: formData.instructions.split('\n')[0] || 'A delicious recipe',
        image: 'https://via.placeholder.com/300x200?text=New+Recipe',
        ingredients: formData.ingredients.split('\n').filter(item => item.trim()),
        instructions: formData.instructions.split('\n').filter(step => step.trim())
      };

      console.log('New recipe submitted:', newRecipe);
      alert('Recipe submitted successfully! (Check console for details)');

      // Reset form
      setFormData({
        title: '',
        ingredients: '',
        instructions: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Link to="/" className="inline-block mb-4 text-indigo-600 hover:text-indigo-800 font-medium">
        ← Back to Home
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Add New Recipe
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Recipe Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter recipe title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ingredients * (one per line, at least 2)
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows={6}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.ingredients ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter each ingredient on a new line&#10;e.g.&#10;200g spaghetti&#10;100g pancetta"
            />
            {errors.ingredients && <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>}
          </div>

          <div>
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preparation Steps *
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={8}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.instructions ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter each step on a new line&#10;e.g.&#10;Cook spaghetti in salted boiling water until al dente.&#10;Fry pancetta until crispy."
            />
            {errors.instructions && <p className="mt-1 text-sm text-red-600">{errors.instructions}</p>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                isSubmitting ? 'cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipeForm;
