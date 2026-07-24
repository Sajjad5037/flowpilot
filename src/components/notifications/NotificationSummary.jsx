import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function NotificationSummary({ summary }) {
  console.log("NotificationSummary summary:", summary);

  if (!summary) {
    return (
      <Typography color="error">
        Summary is undefined
      </Typography>
    );
  }

  const cards = [
  {
    title: "Evaluation Links Sent",
    value: summary.sentToday,
  },
  {
    title: "Awaiting Response",
    value: summary.pending,
  },
  {
    title: "Completed",
    value: summary.completed,
  },
  {
    title: "Overdue",
    value: summary.failed,
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