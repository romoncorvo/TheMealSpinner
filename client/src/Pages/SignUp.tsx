import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { LoginAndRegisterRequest } from "../Utils/Types";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const theme = createTheme();

export default function SignUp() {
  const [signupRequest, setSignupRequest] = useState<LoginAndRegisterRequest>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
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

  const signUpUser = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...signupRequest,
        }),
      };

      const response = await fetch(
        `https://localhost:7191/api/UsersAuthentication/register`,
        requestOptions
      );
      return response.ok;
    } catch (e: any) {
      throw new Error("Problems");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const didSignUp = await signUpUser();
    if (didSignUp) {
      setSignupRequest({
        username: "",
        password: "",
      });
      handleClickSuccess();
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } else {
      handleClickError();
    }
  };
  return (
    <div
      // style={{ height: "100%" }}
      className="max-w-screen-xl mx-auto items-start shadow-2xl h-screen mt-0"
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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={signupRequest.username}
                    onChange={e =>
                      setSignupRequest({
                        ...signupRequest,
                        username: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={signupRequest.password}
                    onChange={e =>
                      setSignupRequest({
                        ...signupRequest,
                        password: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Snackbar open={openError} autoHideDuration={2500} onClose={handleClose}>
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Could not register!
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
          Registration successful!
        </Alert>
      </Snackbar>
    </div>
  );
}
