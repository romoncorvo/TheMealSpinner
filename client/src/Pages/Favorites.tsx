import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RecipeCard from "../Components/RecipeCard";
import { LoginResponse, Recipe } from "../Utils/Types";
import Favorite from "./Favorite";

interface FavoritesProps {
  user: LoginResponse;
}

function Favorites(props: FavoritesProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favoriteId, setFavoriteId] = useState(0);
  var favoriteRecipe = recipes.find(recipe => recipe.id === favoriteId);
  let { state } = useLocation();

  useEffect(() => {
    async function getRecipes() {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        };
        const response = await fetch(
          `https://localhost:7191/api/Recipes?token=${props.user.token}`,
          requestOptions
        );
        const json = await response.json();
        setRecipes(json);
      } catch (e: any) {
        throw new Error("Problems");
      }
    }
    getRecipes();
  }, [props.user.token]);

  useEffect(() => {
    setFavoriteId(state.favoriteIdWhenRouted);
    window.scrollTo(0, 0);
  }, [state]);

  return (
    <>
      {!favoriteId
        ? recipes.length > 0 && (
            <main className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4 max-w-screen-xl mx-auto shadow-2xl h-full">
              {recipes
                .sort((a, b) => a.id - b.id)
                .map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    Recipe={recipe}
                    setFavoriteId={setFavoriteId}
                  />
                ))}{" "}
            </main>
          )
        : favoriteRecipe !== undefined && (
            <Favorite
              recipe={favoriteRecipe}
              user={props.user}
              setRecipes={setRecipes}
              recipes={recipes}
            ></Favorite>
          )}
    </>
  );
}

export default Favorites;
