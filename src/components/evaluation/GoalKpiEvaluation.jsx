import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function GoalKpiEvaluation() {
  return (
    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Quarterly Goal & KPI Setting
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Review employee goals, KPIs and overall performance for the selected
        review period.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Employee
          </Typography>
          <Typography variant="body1">
            John Smith
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Supervisor
          </Typography>
          <Typography variant="body1">
            Sarah Johnson
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Quarter
          </Typography>
          <Typography variant="body1">
            Q2 2026
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Review Period
          </Typography>
          <Typography variant="body1">
            Apr 1, 2026 - Jun 30, 2026
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="h6" gutterBottom>
        Evaluation Includes
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          mb: 4,
        }}
      >
        <Chip label="Mission Statement" />
        <Chip label="Core Values" />
        <Chip label="Quarterly Goals" />
        <Chip label="KPI Results" />
        <Chip label="Extra Projects" />
        <Chip label="Moving Forward" />
        <Chip label="Professional Attributes" />
        <Chip label="Final Evaluation" />
      </Box>

      <Paper
        variant="outlined"
        sx={{
          p: 3,
          bgcolor: "#fafafa",
          mb: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Preview
        </Typography>

        <Typography color="text.secondary">
          Once this evaluation is assigned as part of an evaluation cycle, employees
          and supervisors will receive secure links via email or Slack to complete
          their respective sections. This page previews the evaluation they will see.
        </Typography>
      </Paper>

      <Button
        variant="contained"
        size="large"
        startIcon={<PlayArrowIcon />}
      >
        Start Evaluation
      </Button>
    </Paper>
  );
}