import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Typography,
} from "@mui/material";

import SectionCard from "../../common/SectionCard";

export default function BarChartCard({
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
          No department performance data available.
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
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="department"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="score"
            fill="#22C55E"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </SectionCard>
  );
}