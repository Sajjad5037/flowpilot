import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { getMeetingQueue } from "../../services/meetingQueueService";

import MeetingQueueSummary from "../../components/meetingQueue/MeetingQueueSummary";
import MeetingQueueTable from "../../components/meetingQueue/MeetingQueueTable";

export default function MeetingQueue() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const response = await getMeetingQueue();
      setData(response);
    }

    load();
  }, []);

  if (!data) return null;

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Meeting Queue
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Manage scheduled performance review meetings and monitor their progress.
      </Typography>

      <MeetingQueueSummary summary={data.summary} />

      <MeetingQueueTable meetings={data.meetings} />
    </>
  );
}