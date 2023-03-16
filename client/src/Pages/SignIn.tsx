import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import {
  LoginAndRegisterRequest,
  LoginResponse,
  SetValue,
} from "../Utils/Types";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

const theme = createTheme();

interface signInProps {
  setUser: SetValue<LoginResponse>;
}

export default function SignIn(props: signInProps) {
  const [loginRequest, setLoginRequest] = useState<LoginAndRegisterRequest>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [openError, setOpenError] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const handleClickError = () => {
    setOpenError(true);
  };

  const handleClickForgotPassword = () => {
    setOpenForgotPassword(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
    setOpenForgotPassword(false);
  };

  const loginUser = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...loginRequest,
        }),
      };

      const response = await fetch(
        `https://localhost:7191/api/UsersAuthentication/login`,
        requestOptions
      );
      if (response.ok) {
        const json = await response.json();
        props.setUser(json);
      }
      return response.ok;
    } catch (e: any) {
      throw new Error("Problems");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const didLogIn = await loginUser();
    if (didLogIn) {
      setLoginRequest({
        username: "",
        password: "",
      });
      navigate("/");
    } else {
      handleClickError();
    }
  };

  return (
    <div
      // style={{ height: "100vh" }}
      className="max-w-screen-xl mx-auto items-start shadow-2xl h-screen min-h-full mt-0"
    >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, mt: 6, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={loginRequest.username}
                onChange={e =>
                  setLoginRequest({
                    ...loginRequest,
                    username: e.target.value,
                  })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={loginRequest.password}
                onChange={e =>
                  setLoginRequest({
                    ...loginRequest,
                    password: e.target.value,
                  })
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="body2"
                    onClick={handleClickForgotPassword}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Snackbar
        open={openForgotPassword}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="warning"
          sx={{
            width: "100%",
          }}
        >
          Ha-Ha! Tough luck!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Wrong username or password!
        </Alert>
      </Snackbar>
    </div>
  );
}
