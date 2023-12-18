import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function WeatherCard(props) {
  console.log(props.url);
  return (
    <>
      <Box marginBottom={"4rem"} backgroundColor={"#fff"}>
      <Box
        style={{
          backgroundImage: `url(${props.url})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "200px", // Example height, adjust as needed
        }}
      >
          <Box margin={"1rem"}>{props.city}</Box>
          <Box
            height={"50%"}
            bgGradient={"linear(to-t, #0a0b1cd9, #ffffff00 100%)"}
            display={"flex"}
            alignItems={"flex-end"}
            padding={"1rem"}
          >
            <Typography
              fontSize={"3xl"}
              fontWeight={"medium"}
              color={"whiteAlpha.900"}
            >
              {props.temperature}°C
            </Typography>
          </Box>
          <Box
            display={"flex"}
            height={"50%"}
            alignItems={"flex-end"}
            padding={"1rem"}
          >
            <Typography
              fontSize={"xl"}
              fontWeight={"medium"}
              color={"whiteAlpha.900"}
            >
              {props.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

//<Box maxW={'sm'}
//              borderWidth={'1px'}
//              borderRadius={'lg'}
//              overflow={'hidden'}
//              margin={'2rem'}>
//             <Image src={property.imageUrl}/>
//             <Box p={'6'}>
//                 <Box display={'flex'}
//                      alignItems={'baseline'}>
//                     <Badge borderRadius={'full'} px={'2'} colorScheme={'teal'}>
//                         New!!
//                     </Badge>
//                     <Box color={'gray.500'}
//                          fontWeight={'semibold'}
//                          letterSpacing={'wide'}
//                          fontSize={'xs'}
//                          textTransform={'uppercase'}
//                          ml={'2'}>
//                         {property.beds} beds &bull; {property.baths} baths
//                     </Box>
//                 </Box>
//                 <Box mt={'1'} fontWeight={'semibold'}
//                      as={'h4'}
//                      lineHeight={'tight'}
//                      noOfLines={1}>
//                     {property.title}
//                 </Box>
//             </Box>
//         </Box>
