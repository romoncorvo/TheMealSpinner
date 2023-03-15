import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { LoginResponse, Recipe } from "../Utils/Types";

interface FavoriteProps {
  user: LoginResponse;
  recipe: Recipe;
}

function Favorite(props: FavoriteProps) {
  async function updateRecipe() {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.user.token}`,
        },
        body: JSON.stringify({
          ...props.recipe,
        }),
      };

      const response = await fetch(
        `https://localhost:7191/api/Recipes?token=${props.user.token}`,
        requestOptions
      );
      return response.ok;
    } catch (e: any) {
      throw new Error("Problems");
    }
  }

  return (
    <main className="grid grid-cols-12">
      {props.recipe && (
        <>
          <h1 className="col-span-6 text-6xl mt-4 ml-6">
            {props.recipe.title}
          </h1>
          <img
            className="col-span-6 text-6xl mt-4"
            src={props.recipe.image}
            alt={props.recipe.title}
          ></img>
          <section className="col-span-6 text-xl mt-4">
            <ul>
              {props.recipe!.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </section>
          <section className="col-span-6 text-xl mt-4">
            <ol>
              {props.recipe!.instructions.map((instruction, index) => (
                <li key={index}>
                  <b>Step {index + 1}: </b>
                  {instruction.text}
                </li>
              ))}
            </ol>
          </section>
        </>
      )}
      {props.user.token && props.recipe !== undefined && (
        <section className="col-span-full text-sm mt-6 flex items-center justify-center">
          <Button
            type="button"
            variant="outlined"
            size="sm"
            className="mx-auto text-lg mb-4 mr-4"
            onClick={() => updateRecipe()}
          >
            Update recipe
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="red"
            size="sm"
            className="mx-auto text-lg mb-4"
            onClick={() => updateRecipe()}
          >
            Delete recipe
          </Button>
        </section>
      )}
    </main>
  );
}

export default Favorite;
