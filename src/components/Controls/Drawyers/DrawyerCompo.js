import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ToolList from "../ToolLists/ToolList";
import CollapsibleListItem from "../Collapses/CollapseComponent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import LoginIcon from "@mui/icons-material/Login";
import Favourite from "../../Users/Favourites";
import Login from "../../Users/Logins";
import baseMapData from "../../../public/data/basemap_data";

const drawerWidth = 240;
const closedDrawerWidth = 70;

export default function DrawerComponent({
  opacity,
  handleOpacityChange,
  selectBasedMap,
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showLoginForm, setShowLoginForm] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleBaseMapChange = (event) => {
    console.log(event.target.value);
    console.log(selectedValue);
    if (event.target.value === selectedValue) {
      setSelectedValue("");
    } else {
      selectBasedMap(event.target.value);
      setSelectedValue(event.target.value);
    }
  };

  return (
    <>
      {" "}
      <Box sx={{ display: "flex", height: "200px" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h10" noWrap component="div">
              {open && "Custom"} {"Weather Dashboard"}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawers
          variant="permanent"
          open={open}
          anchor="right"
          sx={{ ml: "auto" }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <List>
            <CollapsibleListItem primary="Background" textWhenClosed={"test"}>
              <RadioGroup value={selectedValue} onChange={handleBaseMapChange}>
                {baseMapData.map((text, index) => (
                  <ListItemButton
                    key={text.name + index}
                    sx={{ pl: 2.3, py: 0, my: 0 }}
                  >
                    <ListItemIcon>
                      <FormControlLabel
                        value={selectedValue}
                        control={<Radio size="small" value={text.name} />}
                        onChange={handleBaseMapChange}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2">{text.name}</Typography>
                      }
                    />
                  </ListItemButton>
                ))}
              </RadioGroup>
            </CollapsibleListItem>
            <CollapsibleListItem primary="Tile Layers">
              {[{ name: "OSM" }, { name: "Google" }, { name: "Bing" }].map(
                (text, index) => (
                  <ListItemButton key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <FormControl>
                          <FormLabel id="demo-radio-buttons-group-label">
                            {text.name}
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value={text.name}
                              control={<Radio />}
                              label={text.name}
                            />
                          </RadioGroup>
                        </FormControl>
                      }
                    />
                  </ListItemButton>
                )
              )}
            </CollapsibleListItem>

            <CollapsibleListItem primary="Layers Adjustment">
              <ListItemButton>
                <ListItemText
                  primary={
                    <ToolList
                      opacity={opacity}
                      handleOpacityChange={handleOpacityChange}
                    />
                  }
                />
              </ListItemButton>
            </CollapsibleListItem>
          </List>
          <Divider />
          <List>
            <CollapsibleListItem primary="Favourite">
              <ListItemButton>
                <ListItemText primary={<Favourite />} />
              </ListItemButton>
            </CollapsibleListItem>
            <CollapsibleListItem primary="Login">
              <ListItemButton onClick={toggleLoginForm}>
                <LoginIcon />
              </ListItemButton>
              {showLoginForm && <Login />}
            </CollapsibleListItem>
          </List>
          <Divider />
        </Drawers>
       
      </Box>
    </>
  );
}

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `${closedDrawerWidth}px`, 
  [theme.breakpoints.up("sm")]: {
    width: `${closedDrawerWidth}px`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: closedDrawerWidth,

  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: drawerWidth - 50,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawers = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  position: "absolute",
  top: 0, // Changed from 64 to 0 to start from the top
  right: 0,
  bottom: 0, // Added to extend to the bottom of the parent container
  height: "auto", // Changed from a calculated value to 'auto'
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
