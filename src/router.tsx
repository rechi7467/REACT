// components/AppRoutes.js
import { Routes, Route } from 'react-router-dom';
import Recipes from './components/Recipes';
import AddRecipe from './components/AddRecipe';
import HomePage from './components/HomePage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
        </Routes>
    );
};

export default AppRoutes;
