import {
  Avatar,
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import SectionCard from "../common/SectionCard";

export default function MeetingCard({
  meetings = [],
}) {
  if (!meetings.length) {
    return (
      <SectionCard
        title="Upcoming Meetings"
        subtitle="Scheduled performance review meetings"
      >
        <Typography color="text.secondary">
          No upcoming meetings.
        </Typography>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Upcoming Meetings"
      subtitle="Scheduled performance review meetings"
    >
      <Stack spacing={3}>
        {meetings.map((meeting) => (
          <Stack
            key={meeting.id}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 44,
                  height: 44,
                  fontWeight: 600,
                }}
              >
                {meeting.employee.charAt(0)}
              </Avatar>

              <Box>
                <Typography fontWeight={600}>
                  {meeting.employee}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {meeting.role}
                </Typography>

                {meeting.department && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {meeting.department}
                  </Typography>
                )}
              </Box>
            </Stack>

            <Stack
              spacing={0.5}
              alignItems="flex-end"
            >
              <Chip
                label={meeting.time}
                color="primary"
                variant="outlined"
                size="small"
              />

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {meeting.date}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </SectionCard>
  );
}