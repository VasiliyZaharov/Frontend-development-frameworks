import * as React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import CategoriesList from "./categorieslist"
import Recipeslist from "./recipeslist"
import Recipes from "./resipes";

function App() {
    return (
        <>
            <Link to="/">Main</Link>
            <Routes>
                <Route path="/" Component={CategoriesList} />
                <Route path="/category/:id" element={<Recipeslist />} />
                <Route path="/recipes/:id" element={<Recipes />} />
            </Routes>
        </>
    );
}

export default App;
