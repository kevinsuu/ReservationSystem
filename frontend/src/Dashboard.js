import React, { useState, useEffect } from "react";
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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { mainListItems } from "./listItems";

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
export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const displayedAnnouncements = announcements;

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_ANNOUNCEMENTS_API_URL);
      const data = [
        {
          id: 1,
          title: "◖ 寵 愛 媽 咪 ◗ 暖心大回饋 Part 2",
          content: "2024-05-13",
          url: "https://www.yhsports.com.tw/pages.php?pa=news-detail&news_id=66",
          imageUrl: "https://www.yhsports.com.tw/upload_files/news/thumb/1715565575_DpXas.jpg?v=1715565575",
        },
        {
          id: 2,
          title: "◖ 寵 愛 媽 咪 ◗ 暖心大回饋",
          content: "2024-05-10",
          url: "https://www.yhsports.com.tw/pages.php?pa=news-detail&news_id=65",
          imageUrl: "https://www.yhsports.com.tw/upload_files/news/thumb/1715323827_BKItx.jpg?v=1715323827",
        },
        {
          id: 3,
          title: "進入體適能中心健人必備",
          content: "2023-08-01",
          url: "https://www.yhsports.com.tw/pages.php?pa=news-detail&news_id=15",
          imageUrl: "https://www.yhsports.com.tw/upload_files/news/thumb/1694403775_BsYS2.png?v=1694403775",
        },
        {
          id: 4,
          title: "離峰也能半場臨租啦",
          content: "2020-11-23",
          url: "https://www.yhsports.com.tw/pages.php?pa=news-detail&news_id=8",
          imageUrl: "https://www.yhsports.com.tw/upload_files/news/thumb/1693388349_dYjz7.png?v=1694163932",
        },
      ];
      setAnnouncements(data);
      // if (response.ok) {
      //   const data = await response.json();
      //   setAnnouncements(data);
      // } else {
      //   console.error("Failed to fetch announcements");
      // }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };

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
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, color: "black" }}>
              <div className="marquee">
                <span>最新消息 NEWS</span>
              </div>
            </Typography>
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
            position: "relative", // 设置相对定位，以便绝对定位 CircularProgress
          }}
        >
          <Toolbar />

          <Grid container spacing={3}>
            {displayedAnnouncements.map((announcement) => (
              <Grid item key={announcement.id} md={3} lg={3}>
                <Paper sx={{ height: "100%", width: "100%", marginTop: "20px", p: 2, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <a href={announcement.url}>
                    <img src={announcement.imageUrl} alt={announcement.title} style={{ maxWidth: "100%", height: "auto" }} />
                  </a>
                  <Typography variant="body1" sx={{ marginTop: "" }}>
                    {announcement.content}
                  </Typography>
                  <Typography variant="h3" gutterBottom>
                    {announcement.title.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
