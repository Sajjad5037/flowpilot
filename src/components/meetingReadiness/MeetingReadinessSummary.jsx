import { Grid, Paper, Typography } from "@mui/material";

export default function MeetingReadinessSummary({ summary }) {
  const cards = [
    {
      title: "Ready for Meeting",
      value: summary.ready,
    },
    {
      title: "Waiting on Employee",
      value: summary.waitingEmployee,
    },
    {
      title: "Waiting on Supervisor",
      value: summary.waitingSupervisor,
    },
    {
      title: "Meetings Scheduled",
      value: summary.scheduled,
    },
  ];

  return (
    <Grid
      container
      spacing={3}
      mb={4}
    >
      {cards.map((card) => (
        <Grid
          key={card.title}
          size={{ xs: 12, md: 3 }}
        >
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4">
              {card.value}
            </Typography>

            <Typography color="text.secondary">
              {card.title}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}