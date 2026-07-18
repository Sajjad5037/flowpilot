import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import SectionCard from "../../common/SectionCard";

export default function LineChartCard({
  title = "Monthly Review Completion",
  subtitle = "Reviews completed over the last six months",
  data = [],
}) {
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
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="reviews"
            stroke="#2563EB"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </SectionCard>
  );
}