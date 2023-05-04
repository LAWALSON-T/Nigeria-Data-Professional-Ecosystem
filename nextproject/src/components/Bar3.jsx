import { Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
export const BarChart3 = ({ graph, options, label, heading }) => {
  return (
    <Box component="div">
      <h3>{heading}</h3>
      <Bar
        options={{
          ...options,
          ...{
            scales: {
              y: {
                display: true,
                stacked: true,
                min: 0,
                max:
                  Number(Math.max(...Object.values(graph))) % 2 === 0
                    ? Number(Math.max(...Object.values(graph))) + 0.5
                    : Number(Math.max(...Object.values(graph))) + 0.2,
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
              backgroundColor: ["#004d40", "#0d47a1", "#ffd600"],
              borderColor: ["#4db6ac", "#90caf9", "#fff176"],
              borderWidth: 1,
              barThickness: 50,
            },
          ],
        }}
      ></Bar>
    </Box>
  );
};
