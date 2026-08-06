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
    <SectionCard>

      <Box
          sx={{
              display: "grid",
              gridTemplateColumns: "90px 90px",
              alignItems: "center",
              justifyItems: "end",
              columnGap: 2,
              flexShrink: 0
          }}
      >
        <Typography
            variant="h5"
            fontWeight={700}
        >
            Upcoming Meetings
        </Typography>

        <Typography
            variant="body2"
            color="text.secondary"
        >
            Scheduled performance review meetings
        </Typography>
    </Box>

    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
          flex: 1
      }}
  >
        {meetings.map((meeting) => (

            <Stack
                key={meeting.id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    width: "100%"
                }}
            >
                {/* Employee Information */}

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
                            fontWeight: 600
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

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {meeting.department}
                        </Typography>
                    </Box>
                </Stack>

                {/* Meeting Schedule */}

                <Stack
                    direction="row"
                    spacing={3}
                    alignItems="center"
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {meeting.date}
                    </Typography>

                    <Chip
                        label={meeting.time}
                        color="primary"
                        variant="outlined"
                        size="small"
                    />
                </Stack>

            </Stack>

        ))}
    </Stack>

</SectionCard>
  );
}