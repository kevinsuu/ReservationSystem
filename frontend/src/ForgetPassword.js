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

const defaultTheme = createTheme();
defaultTheme.typography = {
  fontFamily: `huninn`,
  pxToRem: (size) => `${(size / 16) * 1}rem`,
};
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "/api/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword, name }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate(`/`);
        }, 1000);
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
              忘記密碼
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField
                margin="normal"
                required
                fullWidth
                type="newPassword"
                label="新密碼"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField margin="normal" required fullWidth type="name" label="帳號名稱" value={name} onChange={(e) => setName(e.target.value)} />
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
                送出
              </Button>
              {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  <AlertTitle>成功</AlertTitle>
                  已重設密碼
                </Alert>
              )}
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  <AlertTitle>錯誤</AlertTitle>
                  發生錯誤，請稍後再試
                </Alert>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
