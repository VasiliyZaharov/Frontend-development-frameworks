import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import CategoriesPage from './CategoriesPage';
import RecipePage from './RecipePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={MainPage} />
        <Route path="/categories" component={CategoriesPage} />
        <Route path="/recipe/:id" component={RecipePage} />
      </Routes>
    </Router>
  );
}

export default App;

