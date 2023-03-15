import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Rating } from "@mui/material";
import { Recipe } from "../Utils/Types";

interface RecipeCardProps {
  Recipe: Recipe;
  setFavoriteId: React.Dispatch<React.SetStateAction<number>>;
}

export default function RecipeCard(props: RecipeCardProps) {
  return (
    <Card className="mx-auto max-w-[26rem] shadow-lg overflow-hidden h-[26rem]">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none sm:h-56"
      >
        <img
          //   height={200}
          //   width={266}
          src={props.Recipe.image}
          alt="ui/ux review check"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody className="sm:h-36 flex flex-col items-center justify-between pt-2 pb-0 ">
        <Typography variant="h5" color="blue-gray" className="font-bold">
          {props.Recipe.title}
        </Typography>
        <Typography
          color="blue-gray"
          className="flex items-center gap-1.5 font-normal"
        >
          <Rating name="read-only" value={props.Recipe.rating} readOnly />
        </Typography>
      </CardBody>
      <CardFooter className="pt-3">
        <Button
          size="lg"
          fullWidth={true}
          onClick={() => props.setFavoriteId(props.Recipe.id)}
        >
          Full recipe
        </Button>
      </CardFooter>
    </Card>
  );
}
