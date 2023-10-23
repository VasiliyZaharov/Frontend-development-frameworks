import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './RecipePage.css';

function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/recipes/${id}/`);
        const recipeData = response.data;
        setRecipe(recipeData);
      } catch (error) {
        console.error('Ошибка при получении рецепта:', error);
      }
    };

    getRecipe();
  }, [id]);

  return (
    <div className="recipe-container"> {/* Применяем стили через класс */}
      {recipe ? (
        <div>
          <h1 className="recipe-title">{recipe.title}</h1>
          <p className="recipe-description">{recipe.description}</p>
          <h2 className="recipe-section">Ингредиенты:</h2>
          <ul className="recipe-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2 className="recipe-section">Инструкции:</h2>
          <ol className="recipe-list">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
          <Link to={`/categories/${recipe.category}/`} className="back-link">Назад к категории</Link>
        </div>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
}

export default RecipePage;
