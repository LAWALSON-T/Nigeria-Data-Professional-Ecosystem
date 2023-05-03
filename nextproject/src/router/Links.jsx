import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { AppContextState } from "../App";

function Links() {
  const { page, to } = useContext(AppContextState);

  return (
    <Box p={2} component="div">
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <NavLink
          style={{ fontSize: "20px", fontWeight: "bolder" }}
          className="link"
          to="/"
        >
          {page === "Dashboard" ? "Welcome" : null}
        </NavLink>
        <NavLink className="link" to={to}>
          {page}
        </NavLink>
      </Container>
    </Box>
  );
}

export default Links;
