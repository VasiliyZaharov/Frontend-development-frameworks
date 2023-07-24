import { Link, useParams } from "react-router-dom";
import * as React from "react";
import axios from "axios";




function Recipeslist () {
    const {id} = useParams();
    const [recipes, setResipe] = React.useState([]);
    if(!recipes.length) {
        axios.get("http://127.0.0.1:8000/api/pecipelist").then (resp =>{
            setResipe(resp.data.filter(item => item.category === +id ))
        });
    }
    return (
    <div>
        {
            recipes.map(recipe => (
                <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
                    <li>{recipe.title}</li>
                </Link>
            ))
        }
    </div>
    );
}

export default Recipeslist