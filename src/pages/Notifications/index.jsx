import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import notificationService from "../../services/notificationService";

import NotificationSummary from "../../components/notifications/NotificationSummary";
import NotificationTable from "../../components/notifications/NotificationTable";

export default function Notifications() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const response = await notificationService.getNotifications();
        setData(response);
      } catch (error) {
        console.error("Failed to load notifications:", error);
      }
    }

    loadNotifications();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Notifications
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Monitor invitations, reminders, and meeting notifications sent throughout
        the evaluation workflow.
      </Typography>

      <NotificationSummary summary={data.summary} />

      <NotificationTable notifications={data.notifications} />
    </>
  );
}