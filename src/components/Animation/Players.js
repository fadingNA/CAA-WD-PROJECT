import * as React from 'react';
import { Box, Typography, bottomNavigationActionClasses } from '@mui/material';
import { red } from '@mui/material/colors';
import shadows from '@mui/material/styles/shadows';



export default function WeatherPlayer({primary, child}){
    
    return (<>
   <Box sx={{
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 100,
    paddingX: 2,
    paddingY: 2,
    minWidth: '420px',
   }}>
    <Box sx={{
        width: "90%",
        maxWidth: '1000 px',
        padding: '20px',
        boxShadow: '0 0 10px',
        borderRadius: '10px',
        backgroundColor: '#333',
    
    }}>
    <Typography variant='caption' color="whitesmoke">Nonthachai Plodthong testing this componenet</Typography>
    </Box>
   </Box>
    </>)
}


export const playButton = () => {}
export const pauseButton = () => {}
export const backwardButton = () => {}
export const forwardButton = () => {}