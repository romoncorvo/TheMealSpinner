import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { LoginResponse, Recipe } from "../Utils/Types";

interface HomeProps {
  user: LoginResponse;
}

function Home(props: HomeProps) {
  const [recipe, setRecipe] = useState<Recipe>();

  async function getRecipe() {
    try {
      const response = await fetch("https://localhost:7191/api/Recipes/new");
      const json = await response.json();
      setRecipe(json);
      console.log("hi");
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async function saveRecipe() {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.user.token}`,
        },
        body: JSON.stringify({
          ...recipe,
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
      <section className="col-span-full text-sm mt-6 flex items-center justify-center">
        <Button
          type="button"
          variant="filled"
          size="sm"
          className="mx-auto text-lg bg-green-700"
          onClick={() => getRecipe()}
        >
          Spin the wheel to get a meal
        </Button>
      </section>
      {recipe && (
        <>
          <h1 className="col-span-6 text-6xl mt-4 ml-6">{recipe.title}</h1>
          <img
            className="col-span-6 text-6xl mt-4"
            src={recipe.image}
            alt={recipe.title}
          ></img>
          <section className="col-span-6 text-xl mt-4">
            <ul>
              {recipe!.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </section>
          <section className="col-span-6 text-xl mt-4">
            <ol>
              {recipe!.instructions.map((instruction, index) => (
                <li key={index}>
                  <b>Step {index + 1}: </b>
                  {instruction.text}
                </li>
              ))}
            </ol>
          </section>
        </>
      )}
      <section className="col-span-full text-sm mt-6 flex items-center justify-center">
        <Button
          type="button"
          variant="outlined"
          size="sm"
          className="mx-auto text-lg mb-4"
          onClick={() => saveRecipe()}
        >
          Save recipe
        </Button>
      </section>
    </main>
  );
}

export default Home;
