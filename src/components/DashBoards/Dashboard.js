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
import Sliders from "../Controls/Sliders/Slider";
import TorontoCover from "../../public/assets/Toronto_cover.png";
import BankokCover from "../../public/assets/Bangkok_cover.webp";

function Dashboard() {
  return (
    <Box
      width={"100%"}
      paddingY={{ base: "2rem", sm: "2rem" }}
      paddingX={{ base: "1rem", sm: "2rem" }}
      backgroundColor={"#1E1E1E"}
    >
      <Typography
        fontSize={{ base: "5rem", sm: "4rem" }}
        lineHeight={"shorter"}
        fontWeight={"bold"}
        paddingX={"2rem"}
        textAlign={"center"}
        color="white"
      >
        Weather Dashboard
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-around"
        alignItems="start"
      >
        <Box
          component={Paper}
          sx={{
            flex: 1,
            marginRight: "1rem",
            marginLeft: "1rem",
            marginBottom: { xs: "1rem", md: 0 },
          }}
        >
          {createTable()}
        </Box>

        <Box
          sx={{
            flex: 1,
            maxWidth: 500,
            marginRight: "1rem",
            marginLeft: "1rem",
          }}
        >
          <Sliders weatherProperties={weatherProperties} />
        </Box>
      </Box>
    </Box>
  );
}

export const weatherProperties = [
  {
    url: BankokCover,
    city: "Bangkok",
    temperature: "30",
    description: "Cloudy",
  },
  {
    url: BankokCover,
    city: "Bangkok",
    temperature: "30",
    description: "Cloudy",
  },
  {
    url: TorontoCover,
    city: "Toronto",
    temperature: "10",
    description: "Cloudy",
  },
];
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
