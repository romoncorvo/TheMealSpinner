import { Button, Textarea } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { LoginResponse, Recipe } from "../Utils/Types";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface FavoriteProps {
  user: LoginResponse;
  recipe: Recipe;
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  recipes: Recipe[];
}

function Favorite(props: FavoriteProps) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [currentRating, setcurrentRating] = useState(props.recipe.rating);
  const [currentComment, setcurrentComment] = useState(props.recipe.comment);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setcurrentRating(props.recipe.rating);
    setcurrentComment(props.recipe.comment);
  };

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
          Rating: currentRating,
          Comment: currentComment,
        }),
      };
      const response = await fetch(
        `https://localhost:7191/api/Recipes/${props.recipe.id}?token=${props.user.token}`,
        requestOptions
      );
      return response.ok;
    } catch (e: any) {
      throw new Error("Problems");
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function deleteRecipe() {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      };
      const response = await fetch(
        `https://localhost:7191/api/Recipes/${props.recipe.id}?token=${props.user.token}`,
        requestOptions
      );
      return response.ok;
    } catch (e: any) {
      throw new Error("Problems");
    }
  }

  const handleDelete = async () => {
    const didDelete = await deleteRecipe();
    if (didDelete) {
      props.setRecipes(props.recipes.filter(r => r.id !== props.recipe.id));
      navigate("/favorites", { state: { favoriteIdWhenRouted: 0 } });
    } else {
    }
  };

  const handleUpdate = async () => {
    const didUpdate = await updateRecipe();
    if (didUpdate) {
      props.setRecipes([
        ...props.recipes.filter(r => r.id !== props.recipe.id),
        {
          ...props.recipe,
          rating: currentRating,
          comment: currentComment,
        },
      ]);
      setOpen(false);
    } else {
      return;
    }
  };

  return (
    <main className="grid grid-cols-12 max-w-screen-xl mx-auto items-start shadow-2xl h-full">
      {props.recipe && (
        <>
          <section className="col-span-6 text-6xl mt-4 p-5">
            <img
              className="shadow-2xl rounded-md"
              src={props.recipe.image}
              alt={props.recipe.title}
            ></img>
          </section>
          <section className="col-span-6 text-6xl mt-4 pt-5 pl-6 pr-10 flex flex-col ">
            <h1 className="font-serif">{props.recipe.title}</h1>
            <Rating
              name="recipeRating"
              className="my-5 self-center"
              value={currentRating}
              onClick={handleClickOpen}
              onChange={(event, newValue) => setcurrentRating(newValue)}
            />
            <Textarea
              label="Comment"
              readOnly
              className="pr-5 font-sans"
              onClick={handleClickOpen}
              value={props.recipe.comment ?? ""}
            />
          </section>

          <section className="col-span-6 text-xl pt-8 pl-14 pr-6">
            <h3 className="mb-4 text-4xl mt-0 font-serif">
              <b>Ingredients</b>
            </h3>
            <ul>
              {props.recipe!.ingredients.map((ingredient, index) => (
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
              {props.recipe!.instructions.map((instruction, index) => (
                <li className="mb-3 font-sans" key={index}>
                  <b>Step {index + 1}: </b>
                  {instruction.text}
                </li>
              ))}
            </ol>
          </section>
        </>
      )}
      {props.user.token && props.recipe !== undefined && (
        <>
          <section className="col-span-full text-sm mt-6 flex items-center justify-center">
            <Button
              type="button"
              variant="outlined"
              size="sm"
              className="mx-auto text-lg mb-4 mr-0"
              onClick={handleClickOpen}
            >
              Edit rating
            </Button>
            <Button
              type="button"
              variant="filled"
              color="red"
              size="sm"
              className="mx-auto text-lg mb-4 ml-4"
              onClick={() => handleDelete()}
            >
              Delete recipe <DeleteForeverOutlinedIcon />
            </Button>
          </section>
          <Dialog open={open} onClose={() => handleClose()}>
            <DialogTitle>Rate this recipe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Rate this recipe, your feedback would be greatly appreciated.
              </DialogContentText>
              <Rating
                name="recipeRating"
                className="my-5 self-center"
                value={currentRating}
                onClick={handleClickOpen}
                onChange={(event, newValue) => setcurrentRating(newValue)}
              />
              <Textarea
                label="Comment"
                className="pr-5 font-sans"
                onChange={e => setcurrentComment(e.target.value)}
                value={currentComment ?? ""}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleUpdate()}>Save changes</Button>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </main>
  );
}

export default Favorite;
