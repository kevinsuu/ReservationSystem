import React, { useState, useEffect, useCallback, useMemo } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { mainListItems } from "../listItems";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();
defaultTheme.typography = {
  fontFamily: `huninn`,
  pxToRem: (size) => `${(size / 16) * 1}rem`,
};
export default function Backstage() {
  const [open, setOpen] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const images = useMemo(() => {
    const imagesArray = [];

    return imagesArray;
  }, []);
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handlePrevImage = useCallback(() => {
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }, [images.length]); // 添加了依賴 images.length

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]); // 添加了依賴 images.length

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          handlePrevImage();
          break;
        case "ArrowRight":
          handleNextImage();
          break;
        case "ArrowUp":
        case "ArrowDown": // 合併 ArrowUp 和 ArrowDown 的 case
          handleNextImage();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePrevImage, handleNextImage]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
              backgroundColor: "#E2BFB3",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box>
          <Drawer variant="permanent" open={open} sx={{ height: "100%", backgroundColor: "#FEECE2" }}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
                backgroundColor: "#FEECE2",
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav" sx={{ height: "100%", backgroundColor: "#FEECE2" }}>
              {mainListItems}
            </List>
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            padding: (theme) => theme.spacing(3),
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>
              {images.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} sx={{ height: "fit-content" }}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      height: "fit-content",
                    }}
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={`${image}`}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        maxHeight: "100%",
                        width: "auto",
                      }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>

          {selectedImageIndex !== null && (
            <Box
              onClick={(event) => {
                if (!event.target.closest("button")) {
                  setSelectedImageIndex(null);
                }
              }}
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
              }}
            >
              <IconButton
                sx={{
                  marginLeft: "8px",
                  background: "white",
                  "&:hover": {
                    backgroundColor: "lightgrey",
                  },
                }}
                onClick={handlePrevImage}
              >
                <NavigateBeforeIcon />
              </IconButton>
              <img src={images[selectedImageIndex]} alt="照片" style={{ maxHeight: "90%", maxWidth: "90%", borderRadius: 10 }} />
              <IconButton
                sx={{
                  marginLeft: "8px",
                  background: "white",
                  "&:hover": {
                    backgroundColor: "lightgrey",
                  },
                }}
                onClick={handleNextImage}
              >
                <NavigateNextIcon />
              </IconButton>
              <Typography
                variant="body2"
                sx={{
                  position: "absolute",
                  bottom: "8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                {selectedImageIndex + 1} / {images.length}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
