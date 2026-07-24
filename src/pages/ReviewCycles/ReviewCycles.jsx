import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import QuarterCard from "../../components/reviewCycles/QuarterCard";

import {
  getReviewCycles,
  updateReviewCycle,
} from "../../services/reviewCycleService";

export default function ReviewCycles() {
  const [reviewCycles, setReviewCycles] = useState([]);

  useEffect(() => {
    loadReviewCycles();
  }, []);

  const loadReviewCycles = async () => {
    const data = await getReviewCycles();
    setReviewCycles(data);
  };

  const handleSave = async ({ quarter, sendDate }) => {
    const cycle = reviewCycles.find(
      (item) => item.quarter === quarter
    );

    if (!cycle) return;

    await updateReviewCycle(cycle.id, sendDate);

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
    </Box>
  );
}