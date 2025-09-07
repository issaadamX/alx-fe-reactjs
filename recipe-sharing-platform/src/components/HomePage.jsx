import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/src/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch recipe data');
        }
        return response.json();
      })
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error loading recipe data:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Recipe Sharing Platform
      </h1>
      <div className="text-center mb-8">
        <Link
          to="/add-recipe"
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add New Recipe
        </Link>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recipes.map(({ id, title, summary, image }) => (
          <div
            key={id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h2>
              <p className="text-gray-700 dark:text-gray-300">{summary}</p>
              <Link
                to={`/recipe/${id}`}
                className="inline-block mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
