import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Dashboard() {
  return (
    <>
      <Box
        position="relative"
        minHeight={{ base: "110vh", sm: "60vh" }}
        backgroundColor="white"
        backgroundPosition="center"
        backgroundAttachment="fixed"
      >
        <Box
          position="absolute"
          width="100%"
          height="100%"
          opacity="0.85"
          backgroundColor="blue.900"
          padding="1rem"
        ></Box>
        <Box
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent={{ base: "flex-start", sm: "space-between" }}
          alignItems="center"
          maxWidth="1289"
          position="absolute"
          color="white"
          fontWeight="light"
          left="0"
          right="0"
          top="0"
          margin="auto"
          padding="1rem"
        >
          <Box width={{ base: "100%", sm: "50%" }}>
            <Typography variant="h4" component="h4" gutterBottom color="#333">
              Dashboard
            </Typography>
            {createTable()}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;

export const rows = [
  {
    id: 1,
    time: "10:00",
    latitude: "0.00",
    longitude: "0.00",
    altitude: "1000",
    speed: "500",
    heading: "N",
  },
  {
    id: 1,
    time: "10:00",
    latitude: "0.00",
    longitude: "0.00",
    altitude: "1000",
    speed: "500",
    heading: "N",
  },
];

export function createTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Latitude</TableCell>
            <TableCell align="right">Longitude</TableCell>
            <TableCell align="right">Altitude</TableCell>
            <TableCell align="right">Speed</TableCell>
            <TableCell align="right">Heading</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">{row.latitude}</TableCell>
              <TableCell align="right">{row.longitude}</TableCell>
              <TableCell align="right">{row.altitude}</TableCell>
              <TableCell align="right">{row.speed}</TableCell>
              <TableCell align="right">{row.heading}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
