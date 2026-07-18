import {
  Avatar,
  Box,
  Stack,
  Typography,
} from "@mui/material";

import SectionCard from "../common/SectionCard";

export default function ActivityTimeline({
  activities = [],
}) {
  return (
    <SectionCard
      title="Activity Timeline"
      subtitle="Recent activity across your organization"
    >
      <Stack spacing={3}>
        {activities.map((activity) => (
          <Stack
            key={activity.id}
            direction="row"
            spacing={2}
            alignItems="flex-start"
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 42,
                height: 42,
                fontWeight: 600,
              }}
            >
              {activity.user.charAt(0)}
            </Avatar>

            <Box flex={1}>
              <Typography
                fontWeight={600}
                mb={0.5}
              >
                {activity.user}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {activity.action}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                  display: "block",
                }}
              >
                {activity.time}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </SectionCard>
  );
}