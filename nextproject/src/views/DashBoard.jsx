/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  Box,
  Grid,
  MenuItem,
  CircularProgress,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useContext, useState, useCallback } from "react";
import { AppContextState } from "../App";

import { roles } from "../components/Roles";

import sector from "../assests/csv/sector.csv";
import job from "../assests/csv/data_prof.csv";

import { converter } from "../utility/converter";
import { options } from "../utility/graph";
import { handleGetDataset, handleGetData, handleGetSector } from "../utility";

import { PieChart } from "../components/Pie";
import { BarChart } from "../components/Bar";
import { BarChart2 } from "../components/Bar2";
import { BarChart3 } from "../components/Bar3";

function DashBoard() {
  const { setPage, setTo, data, setData } = useContext(AppContextState);
  const { role, tool, experience, education, workType, skills, sectors } = data;

  const [plot, setPlot] = useState([]);
  const [chart, setChart] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleConvert = async (csv) => {
    try {
      const value = await converter(csv);
      return value;
    } catch (e) {
      console.error(e.message);
    }
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await handleConvert(sector);
      setPlot(res);
      const res2 = await handleConvert(job);
      setChart(res2);
      setLoading(false);
    } catch (e) {
      console.error(e.message);
    }
  };

  const getChart = useCallback(() => {
    const tools = handleGetDataset(chart, "Tools", role);
    setData({
      type: "Get_Data",
      key: "tool",
      value: tools,
    });
    const exper = handleGetData(chart, "Years_of_Experience", role);
    setData({
      type: "Get_Data",
      key: "experience",
      value: exper,
    });

    const edu = handleGetData(chart, "Education_Level", role);
    setData({
      type: "Get_Data",
      key: "education",
      value: edu,
    });
    const work = handleGetData(chart, "workplace_type", role);
    setData({
      type: "Get_Data",
      key: "workType",
      value: work,
    });
    const skill = handleGetDataset(chart, "Skills", role);
    setData({
      type: "Get_Data",
      key: "skills",
      value: skill,
    });
    const sect = handleGetSector(plot, role);
    setData({
      type: "Get_Data",
      key: "sectors",
      value: sect,
    });
  }, [chart, role, plot, setData]);

  const handleInput = (e) => {
    e.preventDefault();
    setData({
      type: "User_Input",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  useEffect(() => {
    setPage("Home");
    setTo("/");
    setTimeout(() => fetchData(), 2000);
  }, []);

  useEffect(() => {
    getChart();
  }, [getChart]);

  return (
    <Container className="dashboard">
      <Box>
        <Box pt={4} sx={{ textAlign: "center" }}>
          {role ? (
            <Typography component="h2" variant="h5">
              Overview as a {role}
            </Typography>
          ) : null}
        </Box>
        <Grid spacing={1} container>
          <Grid item xs={12} md={3}>
            <Select
              sx={{ width: "250px", margin: ".5em" }}
              variant="outlined"
              color="primary"
              name="role"
              value={role}
              onChange={handleInput}
              size="large"
            >
              <MenuItem disabled>
                <em>Select a role</em>
              </MenuItem>
              {roles &&
                roles.map((role) => (
                  <MenuItem key={role.id} value={role.role}>
                    {role.role}
                  </MenuItem>
                ))}
            </Select>
            {loading || chart.length === 0 ? null : (
              <Box component="div">
                {education && Object.keys(education).length > 0 ? (
                  <PieChart
                    options={options}
                    heading="Education"
                    role={role}
                    graph={education}
                  />
                ) : (
                  <p>
                    <small>No education level recorded for this role yet</small>
                  </p>
                )}
                {workType && Object.keys(workType).length > 0 ? (
                  <PieChart
                    options={options}
                    heading="Workplace Type"
                    role={role}
                    graph={workType}
                  />
                ) : (
                  <p>
                    <small>No workplace type recorded for this role yet</small>
                  </p>
                )}
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={9}>
            {loading || chart.length === 0 ? (
              <Box mt={2} ml={5} sx={{ display: "block" }}>
                <CircularProgress color="secondary" />
              </Box>
            ) : (
              <Grid container>
                <Grid item xs={12} md={6}>
                  {tool && Object.keys(tool).length > 0 ? (
                    <BarChart
                      role={role}
                      graph={tool}
                      heading="Tools"
                      options={options}
                      color1={["#0d47a1"]}
                      color2={["#64b5f6"]}
                      label={`Tools used by a ${role}`}
                    />
                  ) : null}
                  {skills && Object.keys(skills).length > 0 ? (
                    <BarChart
                      role={role}
                      graph={skills}
                      heading="Skills"
                      options={options}
                      color1={["#827717"]}
                      color2={["#dce775"]}
                      label={`Skills required for a ${role}`}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={12} md={6}>
                  {sectors && Object.keys(sectors).length > 0 ? (
                    <BarChart2
                      options={options}
                      graph={sectors}
                      role={role}
                      heading="Sector"
                      label={`Sectors that require a ${role}`}
                    />
                  ) : (
                    <p>
                      <small>No sectors recorded for this role yet</small>
                    </p>
                  )}
                  {experience && Object.keys(experience).length > 0 ? (
                    <BarChart3
                      graph={experience}
                      options={options}
                      heading="Experience"
                      label={`Years of Experience required for  ${role}`}
                    />
                  ) : (
                    <p>
                      <small>No experiences recorded for this role yet</small>
                    </p>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default DashBoard;
