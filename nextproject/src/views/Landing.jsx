import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Typography, Divider, Box } from "@mui/material";
import { AppContextState } from "../App";

function Landing() {
  const { setPage, setTo } = useContext(AppContextState);
  useEffect(() => {
    setPage("Dashboard");
    setTo("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        maxHeight: "100vh",
      }}
      container
    >
      <Grid width="100vw" md={12} xs={12} item>
        <Box
          component="div"
          sx={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <Typography
            variant="h2"
            width="75%"
            component="h1"
            color="white"
            textAlign="center"
            sx={{ fontSize: { md: "70px", xs: "25px" } }}
          >
            Nigeria Data Professional Ecosystem
          </Typography>
          <Divider
            sx={{ padding: "1px", margin: "10px" }}
            variant="middle"
            color="#f44336"
            width={50}
          ></Divider>
        </Box>
        <Box sx={{ display: "grid", placeItems: "center" }} component="div">
          <Typography
            width="50%"
            textAlign="center"
            component="p"
            color="white"
            mb={2}
            variant="body1"
          >
            This project is for aspiring data professionals eager to break into
            the tech ecosystem in Nigeria. The site provides insight into the
            Job requirements, in-demand skills, technologies, companies, and
            locations.
          </Typography>

          <NavLink className="link" to="/dashboard">
            <Typography
              backgroundColor="#ff5722"
              color="#ffffff"
              p={3}
              borderRadius="60px"
              underline="none"
            >
              GET STARTED
            </Typography>
          </NavLink>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Landing;
