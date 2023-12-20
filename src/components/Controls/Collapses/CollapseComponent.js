import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import Box from "@mui/material/Box";
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
            pr: 4,
            py: 0,
          }}
        >
          <RadioButtonCheckedIcon fontSize="small" />
        </ListItemIcon>

        <ListItemText
          primary={
            <Typography variant="body1" component="div">
              {primary}
            </Typography>
          }
          sx={{ py: 0, pl: 0, my: 0 }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit sx={{ py: 0 }}>
        <List component="div" sx={{ py: 0, pl: 0 }}>
          {children}
        </List>
      </Collapse>
    </>
  );
};

export default CollapsibleListItem;
