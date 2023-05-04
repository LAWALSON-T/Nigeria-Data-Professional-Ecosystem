import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";
export const BarChart = ({
  graph,
  heading,
  options,
  color1,
  color2,
  label,
}) => {
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
                    ? Number(Math.max(...Object.values(graph))) + 2
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
              backgroundColor: color1,
              borderColor: color2,
              borderWidth: 1,
            },
          ],
        }}
      ></Bar>
    </Box>
  );
};
