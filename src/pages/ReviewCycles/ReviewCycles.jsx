import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";

import QuarterCard from "../../components/reviewCycles/QuarterCard";

import {
  getReviewCycles,
  updateReviewCycle,
} from "../../services/reviewCycleService";

export default function ReviewCycles() {
  const [reviewCycles, setReviewCycles] = useState([]);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    loadReviewCycles(new Date().getFullYear());
  }, []);

  const loadReviewCycles = async (year) => {
    const data = await getReviewCycles(year);
    setReviewCycles(
      data.map((cycle) => ({
        ...cycle,
        quarter: `Q${cycle.quarter}`,
        reviewPeriod: formatReviewPeriod(cycle.start_date, cycle.end_date),
        sendDate: cycle.invitation_date || "",
      }))
    );
  };

  const handleSave = async ({ quarter, sendDate }) => {
    const cycle = reviewCycles.find(
      (item) => item.quarter === quarter
    );

    if (!cycle) return;

    try {
      await updateReviewCycle(cycle.id, sendDate);
    } catch (error) {
      setFeedback({
        severity: "error",
        message:
          error.response?.data?.detail ||
          `Unable to save ${quarter} invitation date.`,
      });
      return;
    }

    setReviewCycles((prev) =>
      prev.map((item) =>
        item.id === cycle.id
          ? {
              ...item,
              sendDate,
            }
          : item
      )
    );

    setFeedback({
      severity: "success",
      message: `${quarter} invitation date saved successfully.`,
    });
  };

  return (
    <Box>
      <Box mb={5}>
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
        >
          Review Cycles
        </Typography>

        <Typography color="text.secondary">
          Configure when evaluation invitations are sent for each quarterly review cycle.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {reviewCycles.map((cycle) => (
          <Grid
            key={cycle.id}
            size={{ xs: 12, md: 6 }}
          >
            <QuarterCard
              quarter={cycle.quarter}
              reviewPeriod={cycle.reviewPeriod}
              sendDate={cycle.sendDate}
              onSave={handleSave}
            />
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={Boolean(feedback)}
        autoHideDuration={4000}
        onClose={() => setFeedback(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 8, mr: 2 }}
      >
        {feedback ? (
          <Alert
            onClose={() => setFeedback(null)}
            severity={feedback.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {feedback.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Box>
  );
}

function formatReviewPeriod(startDate, endDate) {
  return `${formatMonthDay(startDate)} – ${formatMonthDay(endDate)}`;
}

function formatMonthDay(value) {
  const [year, month, day] = value.split("-").map(Number);
  const monthName = new Date(year, month - 1, day).toLocaleString(
    "en-US",
    { month: "long" }
  );

  return `${monthName} ${day}`;
}