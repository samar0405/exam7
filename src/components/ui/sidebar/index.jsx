import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logocl from "../../../assets/logocl.jpg";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  IconButton,
  Divider,
  Toolbar,
  AppBar,
  CssBaseline,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import {
  Category,
  ProductionQuantityLimits as ProductionQuantityLimitsIcon,
  PeopleAlt as PeopleAltIcon,
  Logout,
  Menu as MenuIcon,
  AccountCircle,
  Add as AddIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import PropTypes from "prop-types";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSection, setSelectedSection] = useState("Category");

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    handleDrawerToggle();
  };

  const drawer = (
    <div className="sidebar">
      <Divider />
      <img src={Logocl} alt="logo" className="h-[55px] w-60" />
      <List className="mt-5">
        <ListItem
          button
          component={NavLink}
          to="/main"
          activeClassName="active"
          onClick={() => handleSectionClick("Category")}
          style={{
            backgroundColor: selectedSection === "Category" ? "#1976d2" : "",
            color: selectedSection === "Category" ? "white" : "black",
          }}
        >
          <ListItemIcon
            className="sidebar-icon"
            style={{
              color: selectedSection === "Category" ? "white" : "black",
            }}
          >
            <Category />
          </ListItemIcon>
          <ListItemText primary="Category" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/main/products"
          activeClassName="active"
          onClick={() => handleSectionClick("Products")}
          style={{
            backgroundColor: selectedSection === "Products" ? "#1976d2" : "",
            color: selectedSection === "Products" ? "white" : "black",
          }}
        >
          <ListItemIcon
            className="sidebar-icon"
            style={{
              color: selectedSection === "Products" ? "white" : "black",
            }}
          >
            <ProductionQuantityLimitsIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/main/workers"
          activeClassName="active"
          onClick={() => handleSectionClick("Workers")}
          style={{
            backgroundColor: selectedSection === "Workers" ? "#1976d2" : "",
            color: selectedSection === "Workers" ? "white" : "black",
          }}
        >
          <ListItemIcon
            className="sidebar-icon"
            style={{ color: selectedSection === "Workers" ? "white" : "black" }}
          >
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary="Workers" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/"
          activeClassName="active"
          onClick={() => handleSectionClick("Log out")}
          style={{
            backgroundColor: selectedSection === "Log out" ? "#1976d2" : "",
            color: selectedSection === "Log out" ? "white" : "black",
          }}
        >
          <ListItemIcon
            className="sidebar-icon"
            style={{ color: selectedSection === "Log out" ? "white" : "black" }}
          >
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {selectedSection}
          </Typography>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar>S</Avatar>
          </IconButton>
          <Menu
            className="mt-10"
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={NavLink} to="#" onClick={handleClose}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem component={NavLink} to="#" onClick={handleClose}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              My account
            </MenuItem>
            <MenuItem component={NavLink} to="#" onClick={handleClose}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem component={NavLink} to="#" onClick={handleClose}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem component={NavLink} to="/" onClick={handleClose}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
