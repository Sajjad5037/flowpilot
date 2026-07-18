import {
  Box,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import SectionCard from "../common/SectionCard";

export default function ProgressCard({
  progress = 78,
  completed = 78,
  total = 100,
}) {
  return (
    <SectionCard
      title="Review Progress"
      subtitle="Overall completion status"
    >
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="h3"
            fontWeight={700}
          >
            {progress}%
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {completed} of {total} reviews completed
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 999,
            bgcolor: "#E2E8F0",
            "& .MuiLinearProgress-bar": {
              borderRadius: 999,
            },
          }}
        />
      </Stack>
    </SectionCard>
  );
}