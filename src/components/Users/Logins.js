import React, { useState } from "react";
import favoruitesAtom from "../../store";
import { useAtom } from "jotai";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Typography,
  Box,
  FormGroup,
} from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";

export default function Login(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [fav, setFavouritesList] = useAtom(favoruitesAtom);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic
  };

  return (
    <React.Fragment>
      {loggedIn && <Alert severity="success">Logged IN!</Alert>}

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ width: "100%", mt: 1, pr: 3 }}
      >
        <FormGroup>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="User"
            placeholder="Username"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            size="small"
            sx={{ mt: 2, mb: 2 }}
          >
            <LoginOutlined />
          </Button>
          {warning && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {warning}
            </Alert>
          )}
        </FormGroup>
      </Box>
    </React.Fragment>
  );
}
