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

export default function Login(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [fav, setFavouritesList] = useAtom(favoruitesAtom);

  // Add your handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic
  };

  return (
    <React.Fragment>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">Login</Typography>
          <Typography variant="body2">
            Enter your login information below:
          </Typography>
        </CardContent>
      </Card>

      {<Alert severity="success">Logged IN!</Alert>}

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
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
