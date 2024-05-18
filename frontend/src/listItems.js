import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom"; // import Link from React Router
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

import { Divider, Box } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
const scrollContainerStyle = {
  maxHeight: "calc(100vh - 100px)", // Adjust as needed
  overflowY: "auto",
};

export const mainListItems = (
  <Box display="flex" flexDirection="column" style={scrollContainerStyle}>
    <React.Fragment>
      <ListItemButton component={Link} to="/homepage">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="主頁" />
      </ListItemButton>
      <ListItemButton component={Link} to="/location">
        <ListItemIcon>
          <SportsCricketIcon />
        </ListItemIcon>
        <ListItemText primary="查看球場" />
      </ListItemButton>
      <ListItemButton component={Link} to="/change">
        <ListItemIcon>
          <BorderColorIcon />
        </ListItemIcon>
        <ListItemText primary="修改預約" />
      </ListItemButton>
      <ListItemButton component={Link} to="/backstage">
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="管理員後台" />
      </ListItemButton>

      <Divider />
      <ListItemButton component={Link} to="/" sx={{ mt: "2px" }}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="登出" />
      </ListItemButton>
    </React.Fragment>
  </Box>
);
