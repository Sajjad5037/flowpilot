import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function MeetingQueueSummary({ summary }) {
  const cards = [
    {
      title: "Meetings Today",
      value: summary.today,
    },
    {
      title: "Upcoming",
      value: summary.upcoming,
    },
    {
      title: "Completed",
      value: summary.completed,
    },
    {
      title: "Rescheduled",
      value: summary.rescheduled,
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {cards.map((card) => (
        <Grid item xs={12} md={3} key={card.title}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                {card.title}
              </Typography>

              <Typography variant="h4">
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}