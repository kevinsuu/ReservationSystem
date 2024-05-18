import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate(`/homepage`);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1500);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/3248238_l.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              登入頁面
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth type="email" label="Email帳號" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                label="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  color: "black",
                  backgroundColor: "#E2BFB3",
                  "&:hover": {
                    backgroundColor: "#F7DED0",
                  },
                }}
              >
                登入
              </Button>
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  <AlertTitle>帳號/密碼錯誤</AlertTitle>
                  請重新登入
                </Alert>
              )}
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <Button
                  component={Link}
                  to="/forgotPassword"
                  variant="text"
                  fullWidth
                  sx={{
                    margin: "2px",
                    mt: 3,
                    mb: 2,
                    color: "black",
                    backgroundColor: "#E2BFB3",
                    "&:hover": {
                      backgroundColor: "#F7DED0",
                    },
                  }}
                >
                  忘記密碼?
                </Button>
                <Button
                  fullWidth
                  component={Link}
                  to="/register"
                  variant="text"
                  sx={{
                    margin: "2px",
                    mt: 3,
                    mb: 2,
                    color: "black",
                    backgroundColor: "#E2BFB3",
                    "&:hover": {
                      backgroundColor: "#F7DED0",
                    },
                  }}
                >
                  註冊帳號
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
