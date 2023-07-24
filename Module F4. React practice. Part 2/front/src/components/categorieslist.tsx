import { Link, useParams } from "react-router-dom";
import * as React from "react";
import axios from "axios";



function CategoriesList () {
    const [categories, setResipe] = React.useState([]);
    if(!categories.length) {
        axios.get("http://127.0.0.1:8000/api/categorylist").then (resp =>{
            setResipe(resp.data)
        });
    }
    return (
    <div>
        <h1> Список категорий </h1>
        {
            categories.map(category => (
                <Link key={category.id} to={`/category/${category.id}`}>
                    <li>{category.title}</li>
                </Link>
            ))
        }           
    </div>
    );
}

export default CategoriesList