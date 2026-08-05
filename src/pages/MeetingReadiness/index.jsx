import { useEffect, useState } from "react";

import {
    Box,
    CircularProgress,
    Typography,
} from "@mui/material";

import {
    getMeetingReadiness
} from "../../services/meetingReadinessService";

import MeetingReadinessSummary
from "../../components/meetingReadiness/MeetingReadinessSummary";

import MeetingReadinessTable
from "../../components/meetingReadiness/MeetingReadinessTable";

export default function MeetingReadiness() {

    const [evaluations, setEvaluations] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

      loadMeetingReadiness();

      const interval = setInterval(() => {

          loadMeetingReadiness();

      }, 10000);

      return () => {

          clearInterval(interval);

      };

  }, []);

    async function loadMeetingReadiness() {

        try {

            const response =
                await getMeetingReadiness();

            setEvaluations(response);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <CircularProgress />

        );

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
                evaluations={evaluations}
            />

            <MeetingReadinessTable
                evaluations={evaluations}
            />

        </Box>

    );

}