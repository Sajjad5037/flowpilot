import { useEffect, useState } from "react";

import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import { getMeetingReadiness } from "../../services/meetingReadinessService";




import MeetingReadinessSummary from "../../components/meetingReadiness/MeetingReadinessSummary";
import MeetingReadinessTable from "../../components/meetingReadiness/MeetingReadinessTable";

export default function MeetingReadiness() {

  const [data, setData] = useState(null);
  
  useEffect(() => {

    async function loadData() {

      const response =
        await getMeetingReadiness();

      setData(response);

    }

    loadData();

  }, []);

  if (!data) {
    return <CircularProgress />;
  }

  return (

    <Box p={4}>

      <Typography
        variant="h4"
        mb={4}
    >
        Meeting Readiness
    </Typography>

      <MeetingReadinessSummary
        summary={data.summary}
      />

      <MeetingReadinessTable
        evaluations={data.evaluations}
      />

    </Box>

  );

}