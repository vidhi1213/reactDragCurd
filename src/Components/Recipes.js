import React from 'react'
import RecipeItem from './RecipeItem';

function Recipes(props) {
    const { recipes } = props;
  return (
    <div className="container ">
                
                
    <div className="row  text-center mt-5 pt-5">
   
    {recipes.map(recipe => (
         <div class="col-md-3">
              <div class="card  py-2 text-center">
        <img src={recipe.recipe.image} className="img-fluid w-50 mx-auto rounded-circle" />
        <div class="card-body">
          <h5>{recipe.recipe.name}</h5>
        </div>
        <ul class="list-group list-group-flush">
          {recipe.recipe.ingredientLines.map(ingredient => (
            <li className="list-group-item">{ingredient}</li>
          ))}
        </ul>
      {console.log("recipes",recipes)}
      </div>
      {/* <RecipeItem
        key={Math.random() * 100}
        name={recipe.recipe.label}
        image={recipe.recipe.image}
        ingredientLines={recipe.recipe.ingredientLines}
      /> */}
      </div>
    ))}
  
  </div>
            </div>
  )
}

export default Recipes