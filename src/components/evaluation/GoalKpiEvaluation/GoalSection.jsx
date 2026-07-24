import { Card, CardContent, Typography } from "@mui/material";

export default function GoalSection() {
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>

        <Typography variant="h5">
          Quarterly Goals
        </Typography>

        <Typography>
          Goal #1
        </Typography>

        <Typography>
          Goal #2
        </Typography>

      </CardContent>
    </Card>
  );
}