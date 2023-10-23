import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories/');
        const categoriesData = response.data;
        setCategories(categoriesData);
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    };

    getCategories();
  }, []);

  return (
    <div>
      <h1>Категории блюд</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/categories/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPage;
