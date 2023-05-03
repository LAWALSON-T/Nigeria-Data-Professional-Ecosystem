import { Box, Container, Typography } from "@mui/material";
import NotFoundGif from "../assests/images/page-not-found.gif";
import { AppContextState } from "../App";
import { useEffect, useContext } from "react";

export const NotFound = () => {
    const { setPage, setTo, } = useContext(AppContextState);
     useEffect(() => {
       setPage("Home");
       setTo("/");
       // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);
  return (
    <Container className="not-found">
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography component="p" m={3} variant="h4">
          Oopps Page not found ...
        </Typography>
        <img style={{ width: "50vw" }} src={NotFoundGif} alt="Not Found" />
      </Box>
    </Container>
  );
};
