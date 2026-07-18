import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { Typography } from "@mui/material";

import SectionCard from "../../common/SectionCard";

const COLORS = [
  "#2563EB",
  "#22C55E",
  "#7C3AED",
  "#F59E0B",
  "#EF4444",
];

export default function PieChartCard({
  title,
  subtitle,
  data = [],
}) {
  if (!data.length) {
    return (
      <SectionCard
        title={title}
        subtitle={subtitle}
      >
        <Typography color="text.secondary">
          No review status data available.
        </Typography>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title={title}
      subtitle={subtitle}
      sx={{ height: "100%" }}
    >
      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="status"
            innerRadius={60}
            outerRadius={110}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.status}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            height={36}
          />
        </PieChart>
      </ResponsiveContainer>
    </SectionCard>
  );
}