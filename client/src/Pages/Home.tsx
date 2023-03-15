import { Button } from "@material-tailwind/react";
import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";
import SpinningWheel from "../Components/SpinningWheel";
import { LoginResponse, Recipe } from "../Utils/Types";

interface HomeProps {
  user: LoginResponse;
}

function Home(props: HomeProps) {
  const [recipe, setRecipe] = useState<Recipe>();
  const [trigger, setTrigger] = useState(0);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleClickError = () => {
    setOpenError(true);
  };

  const handleClickSuccess = () => {
    setOpenSuccess(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
    setOpenSuccess(false);
  };

  async function getRecipe() {
    try {
      const response = await fetch("https://localhost:7191/api/Recipes/new");
      const json = await response.json();
      setRecipe(json);
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

  async function handleSave() {
    const didSave = await saveRecipe();
    if (didSave) {
      handleClickSuccess();
    } else {
      handleClickError();
    }
  }

  return (
    <main
      className="grid grid-cols-12 max-w-screen-xl mx-auto items-start shadow-2xl h-full"
      style={{ minHeight: "100vh" }}
    >
      {!recipe && (
        <>
          <section className="col-span-full text-sm flex items-center justify-center h-20 self-center">
            <Button
              type="button"
              variant="filled"
              size="sm"
              className="mx-auto text-3xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
              onClick={() => setTrigger(trigger => trigger + 1)}
            >
              Spin the wheel to get a meal
            </Button>
          </section>{" "}
          <SpinningWheel trigger={trigger} getRecipe={getRecipe} />
        </>
      )}
      {recipe && (
        <>
          <section className="mt-6 col-span-full text-sm flex items-center justify-center h-20 self-center">
            <Button
              type="button"
              variant="filled"
              size="sm"
              className="mx-auto text-3xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
              onClick={() => getRecipe()}
            >
              Spin the wheel to get a meal
            </Button>
          </section>
          <section className="col-span-6 text-6xl mt-4 p-5">
            <img
              className="shadow-2xl rounded-md"
              src={recipe.image}
              alt={recipe.title}
            ></img>
          </section>
          <section className="col-span-6 text-6xl mt-4 pt-5 pl-6 pr-10 flex flex-col ">
            <h1 className="font-serif">{recipe.title}</h1>
            {props.user.token && recipe !== undefined && (
              <Button
                type="button"
                variant="filled"
                size="lg"
                color="green"
                className="mx-auto text-lg mb-4 mt-28"
                onClick={() => handleSave()}
              >
                Save recipe
              </Button>
            )}
          </section>
          <section className="col-span-6 text-xl pt-8 pl-14 pr-6">
            <h3 className="mb-4 text-4xl mt-0 font-serif">
              <b>Ingredients</b>
            </h3>
            <ul>
              {recipe!.ingredients.map((ingredient, index) => (
                <li className="border-b-2 mb-1 font-sans" key={index}>
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>
          <section className="col-span-6 text-xl pt-8 pr-8 pl-6">
            <h3 className="mb-4 text-4xl mt-0 font-serif">
              <b>Method</b>
            </h3>
            <ol>
              {recipe!.instructions.map((instruction, index) => (
                <li className="mb-3 font-sans" key={index}>
                  <b>Step {index + 1}: </b>
                  {instruction.text}
                </li>
              ))}
            </ol>
          </section>
          <Snackbar
            open={openError}
            autoHideDuration={2500}
            onClose={handleClose}
          >
            <Alert
              variant="filled"
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Could not save recipe!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openSuccess}
            autoHideDuration={2500}
            onClose={handleClose}
          >
            <Alert
              variant="filled"
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Recipe saved successfully!
            </Alert>
          </Snackbar>
        </>
      )}
    </main>
  );
}

export default Home;
