import {
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid";

export default function MeetingReadinessTable({
  evaluations,
}) {
  return (
    <Paper sx={{ p: 3 }}>

      <Typography
        variant="h6"
        mb={3}
      >
        Evaluation Status
      </Typography>
      <Grid
          container
          sx={{
              px: 2,
              pb: 2,
              fontWeight: 700,
              borderBottom: "1px solid #e5e7eb",
              mb: 2,
          }}
      >

          <Grid size={{ xs: 12, md: 3 }}>
              <Typography fontWeight={700}>
                  Employee
              </Typography>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
              <Typography fontWeight={700}>
                  Employee Review
              </Typography>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
              <Typography fontWeight={700}>
                  Supervisor Review
              </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
              <Typography fontWeight={700}>
                  Meeting Status
              </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
              <Typography fontWeight={700}>
                  Action
              </Typography>
          </Grid>

      </Grid>

      <Stack spacing={2}>

        {evaluations.map((item) => {

          const ready =
            item.employeeComplete &&
            item.supervisorComplete;

          return (

            <Paper
              key={item.id}
              variant="outlined"
              sx={{ p: 2 }}
            >
              <Grid
                container
                alignItems="center"
              >

                <Grid size={{ xs: 12, md: 3 }}>
                  <Typography
                      fontWeight={600}
                      gutterBottom
                  >
                      {item.employee}
                  </Typography>

                  <Typography
                      variant="body2"
                      color="text.secondary"
                  >
                      Supervisor:
                  </Typography>

                  <Typography
                      variant="body2"
                  >
                      {item.supervisor}
                  </Typography>
              </Grid>

                <Grid size={{ xs: 6, md: 2 }}>
                  <Typography
                      color={
                          item.employeeComplete
                              ? "success.main"
                              : "warning.main"
                      }
                      fontWeight={600}
                  >
                      {item.employeeComplete
                          ? "✅ Completed"
                          : "⌛ Pending"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 6, md: 2 }}>
                  <Typography
                      color={
                          item.supervisorComplete
                              ? "success.main"
                              : "warning.main"
                      }
                      fontWeight={600}
                  >
                      {item.supervisorComplete
                          ? "✅ Completed"
                          : "⌛ Pending"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>
                  <Typography
                      color={ready ? "success.main" : "text.secondary"}
                      fontWeight={600}
                  >
                      {ready
                          ? "🟢 Ready to Schedule"
                          : item.employeeComplete
                          ? "Waiting on Supervisor"
                          : "Waiting on Employee"}
                  </Typography>
                </Grid>

                <Grid
                  size={{ xs: 12, md: 3 }}
                  textAlign="right"
                >
                  {ready ? (
                      <Button variant="contained">
                          Schedule Meeting
                      </Button>
                  ) : (
                      <Button variant="text">
                          Send Reminder
                      </Button>
                  )}
                </Grid>

              </Grid>

            </Paper>

          );
        })}

      </Stack>

    </Paper>
  );
}