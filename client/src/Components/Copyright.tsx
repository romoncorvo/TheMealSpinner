import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/romoncorvo/TheMealSpinner">
        The Meal Spinner
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
