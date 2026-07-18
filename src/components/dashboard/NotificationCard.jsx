import {
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import SectionCard from "../common/SectionCard";

const statusColors = {
  info: "#2563EB",
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
};

export default function NotificationCard({
  notifications = [],
}) {
  if (!notifications.length) {
    return (
      <SectionCard
        title="Recent Notifications"
        subtitle="Latest system updates"
      >
        <Typography color="text.secondary">
          No notifications available.
        </Typography>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Recent Notifications"
      subtitle="Latest system updates"
    >
      <Stack
        spacing={0}
        divider={<Divider />}
      >
        {notifications.map((notification) => (
          <Box
            key={notification.id}
            py={2}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="flex-start"
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  mt: "7px",
                  borderRadius: "50%",
                  bgcolor:
                    statusColors[notification.type] ??
                    "#94A3B8",
                  flexShrink: 0,
                }}
              />

              <Box flex={1}>
                <Typography fontWeight={500}>
                  {notification.message}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {notification.time}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </SectionCard>
  );
}