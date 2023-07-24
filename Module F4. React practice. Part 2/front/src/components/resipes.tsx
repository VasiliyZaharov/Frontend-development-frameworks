import { Link, useParams } from "react-router-dom";
import * as React from "react";
import axios from "axios";

function Recipes () {
    const {id} = useParams();
    const [recipes, setResipe] = React.useState([]);
    if(!recipes.length) {
        axios.get("http://127.0.0.1:8000/api/pecipelist").then (resp =>{
            setResipe(resp.data.filter(item => item.id === +id ))
        });
    }
    return (
        <div>
        {
            recipes.map(recipe => (
                <div>
                    <h2>{recipe.title}</h2>
                    <p>{recipe.description}</p>                
                </div>
            ))
        }
    </div>
    )
}
export default Recipes
