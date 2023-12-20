import * as React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';
import { blueGrey } from '@mui/material/colors';
import { indigo } from '@material-ui/core/colors';




const theme = createTheme({
    palette: {
        type: "light",
        primary: blueGrey,
        secondary: indigo,
    }
});

export default function WeatherPlayer(){
    return (<>
   
    </>)
}



