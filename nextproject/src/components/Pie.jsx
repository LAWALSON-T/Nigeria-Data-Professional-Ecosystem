import { Pie } from "react-chartjs-2";
import { Box } from "@mui/material";

export const PieChart = ({ graph, heading, options }) => {
  return (
    <Box component="div" mb={6} sx={{ height: "32vh", position: "relative" }}>
      <h3>{heading}</h3>
      <Pie
        options={{
          ...options,
          ...{
            maintainAspectRatio: false,
            plugins: {
              datalabels: {
                formatter: (value, ctx) => {
                  let sum = 0;
                  let dataArr = ctx.chart.data.datasets[ctx.datasetIndex].data;
                  dataArr.map((data) => {
                    return (sum += data);
                  });
                  let percentage = ((value * 100) / sum).toFixed(2) + "%";
                  return percentage;
                },
                color: "white",
                legend: {
                  position: "bottom",
                },
              },
            },
          },
        }}
        data={{
          labels: Object.keys(graph),
          datasets: [
            {
              data: Object.values(graph),
              backgroundColor: ["#4a148c", "#0d47a1", "#f57f17"],
              borderColor: ["#ba68c8", "#64b5f6", "#fff176"],
              borderWidth: 1.5,
            },
          ],
        }}
      ></Pie>
    </Box>
  );
};
