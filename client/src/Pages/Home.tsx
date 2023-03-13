import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Recipe } from "../Utils/Types";

function Home() {
  const [recipe, setRecipe] = useState<Recipe>();

  const getRecipe = async () => {
    try {
      const response = await fetch("https://localhost:7191/api/Recipes/new");
      const json = await response.json();
      setRecipe(json);
      console.log("hi");
    } catch (e: any) {
      throw new Error(e);
    }
  };

  // useEffect(() => {
  //   getRecipe();
  // }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="10vh"
    >
      <Button
        type="button"
        variant="contained"
        sx={{ marginRight: "10px" }}
        onClick={() => getRecipe()}
      >
        Spin the wheel to get a meal
      </Button>
      {recipe && (
        <>
          <h1>{recipe.title}</h1>
          <ul>
            {recipe?.ingredients.map(ingredient => (
              <li>{ingredient}</li>
            ))}
          </ul>
          <ul>
            {recipe?.instructions.map(instruction => (
              <li>{instruction.text}</li>
            ))}
          </ul>
          <img src={recipe.image} alt={recipe.title}></img>
        </>
      )}
    </Box>
  );
}

export default Home;
