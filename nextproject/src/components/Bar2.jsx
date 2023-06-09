import { Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
export const BarChart2 = ({ graph, role, heading, options, label }) => {
  return (
    <Box component="div">
      <h3>{heading}</h3>
      <Bar
        options={{
          ...options,
          ...{
            scales: {
              x: {
                ticks: {
                  callback: function (val, index) {
                    return index % 2 === 0
                      ? this.getLabelForValue(val).substring(0, 15) + "..."
                      : "";
                  },
                },
              },
              y: {
                display: true,
                stacked: true,
                min: 0, // minimum value
                max:
                  Number(Math.max(...Object.values(graph))) % 2 === 0
                    ? Number(Math.max(...Object.values(graph))) + 0.5
                    : Number(Math.max(...Object.values(graph))) + 1,
              },
            },
          },
        }}
        data={{
          labels: Object.keys(graph),
          datasets: [
            {
              label: label,
              data: Object.values(graph).sort((a, b) => b - a),
              backgroundColor: ["#f57f17"],
              borderColor: ["#fff176"],
              borderWidth: 1,
              barThickness:
                role === "Business Analyst" || role === "Data Architect"
                  ? 50
                  : 10,
            },
          ],
        }}
      ></Bar>
    </Box>
  );
};
