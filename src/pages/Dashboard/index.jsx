import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import EngineeringIcon from "@mui/icons-material/Engineering";


import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";


import NotificationCard from "../../components/dashboard/NotificationCard";
import MeetingCard from "../../components/dashboard/MeetingCard";

import LineChartCard from "../../components/dashboard/charts/LineChartCard";
import BarChartCard from "../../components/dashboard/charts/BarChartCard";
import PieChartCard from "../../components/dashboard/charts/PieChartCard";

import dashboardService from "../../services/dashboardService";

import GroupsIcon from "@mui/icons-material/Groups";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await dashboardService.getDashboard();
        setDashboard(data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      }
    }

    loadDashboard();
  }, []);

  if (!dashboard) {
    return <div>Loading dashboard...</div>;
  }

  const {
    statistics,
    progress,
    activities,
    notifications,
    meetings,
    monthlyReviews,
    departmentPerformance,
    reviewStatus,
  } = dashboard;

  const {
  employees,
  supervisors,
  contractors,
  reviews,
  meetings: meetingStats,
  overdue,
} = statistics;

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Michael 👋 Here's what's happening with your review workflow today."
      />

      {/* KPI Cards */}
      {/* Workforce Overview */}

<Grid
  container
  spacing={4}
  sx={{ mb: 4 }}
>
  <Grid
    item
    xs={12}
    sm={6}
    xl={4}
  >
    <StatCard
      title={employees.title}
      value={employees.value}
      unit={employees.unit}
      summary={employees.summary}
      action={employees.action}
      icon={<GroupsIcon />}
      color="#2563EB"
    />
  </Grid>

  <Grid
    item
    xs={12}
    sm={6}
    xl={4}
  >
    <StatCard
      title={supervisors.title}
      value={supervisors.value}
      summary={supervisors.summary}
      action={supervisors.action}
      icon={<SupervisorAccountIcon />}
      color="#7C3AED"
    />
  </Grid>

  <Grid
    item
    xs={12}
    sm={6}
    xl={4}
  >
    <StatCard
      title={contractors.title}
      value={contractors.value}
      summary={contractors.summary}
      action={contractors.action}
      icon={<EngineeringIcon />}
      color="#F59E0B"
    />
  </Grid>
</Grid>

{/* Review Workflow */}

<Grid
  container
  spacing={4}
  sx={{ mb: 4 }}
>
  <Grid
    item
    xs={12}
    sm={6}
    xl={4}
  >
    <StatCard
      title={reviews.title}
      value={reviews.value}
      unit={reviews.unit}
      summary={reviews.summary}
      action={reviews.action}
      icon={<AssignmentTurnedInIcon />}
      color="#22C55E"
    />
  </Grid>

  <Grid
    item
    xs={12}
    sm={6}
    xl={4}
  >
    <StatCard
      title={meetingStats.title}
      value={meetingStats.value}
      unit={meetingStats.unit}
      summary={meetingStats.summary}
      action={meetingStats.action}
      icon={<EventAvailableIcon />}
      color="#7C3AED"
    />
  </Grid>

  <Grid
    item
    xs={12}
    sm={6}
    xl={4}
  >
    <StatCard
      title={overdue.title}
      value={overdue.value}
      unit={overdue.unit}
      summary={overdue.summary}
      action={overdue.action}
      icon={<WarningAmberIcon />}
      color="#EF4444"
    />
  </Grid>
</Grid>

      

      {/* Notifications & Review Status */}

      <Grid
        container
        spacing={4}
      >
        

        <Grid
          item
          xs={12}
          lg={4}
        >
          <MeetingCard
            meetings={meetings}
          />
        </Grid>

        
      </Grid>
    </>
  );
}