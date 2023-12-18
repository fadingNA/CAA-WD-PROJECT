import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React from "react";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Typography from "@mui/material/Typography";

const CollapsibleListItem = ({ primary, children, textWhenClosed }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon
          sx={{
            flexDirection: "column",
            alignItems: "center",
            minWidth: "auto",
            justifyContent: "center",

          }}
        >
          <RadioButtonCheckedIcon fontSize="small" />
          {open ? null : <Typography variant="caption">Layer</Typography>}
        </ListItemIcon>
        <ListItemText
          sx={{ pl: 4 }}
          primary={
            <Typography variant="body1" component="div">
              {primary}
            </Typography>
          }
          secondary={
            open ? null : (
              <Typography variant="caption" component="div">
                {textWhenClosed}
              </Typography>
            )
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 4 }}>
          {children}
        </List>
      </Collapse>
    </>
  );
};

export default CollapsibleListItem;
