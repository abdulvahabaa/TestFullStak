// import React from 'react';
// const LoginPage = () => {
//   return (
// <div>
//     <h1>HEwllo LOgin</h1>
// </div>
//   );
// };

// export default LoginPage;

import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
//   const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        // backgroundColor={}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Social Media
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        // backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to our social Media, Have a nice Time !
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;