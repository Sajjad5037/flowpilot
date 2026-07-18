import {
  Dashboard,
  CalendarMonth,
  Description,
  Groups,
  Person,
  Assignment,
  Notifications,
  Event,
  Analytics,
  PlayCircle,
} from "@mui/icons-material";

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { NavLink } from "react-router-dom";

const mainMenu = [
  {
    title: "Dashboard",
    icon: <Dashboard />,
    path: "/dashboard",
  },
  {
    title: "Review Cycles",
    icon: <CalendarMonth />,
    path: "/review-cycles",
  },
  {
    title: "Templates",
    icon: <Description />,
    path: "/templates",
  },
  {
    title: "Employees",
    icon: <Groups />,
    path: "/employees",
  },
  {
    title: "Supervisors",
    icon: <Person />,
    path: "/supervisors",
  },
  {
    title: "Reviews",
    icon: <Assignment />,
    path: "/reviews",
  },
];

const operationsMenu = [
  {
    title: "Notifications",
    icon: <Notifications />,
    path: "/notifications",
  },
  {
    title: "Meeting Queue",
    icon: <Event />,
    path: "/meeting-queue",
  },
  {
    title: "Analytics",
    icon: <Analytics />,
    path: "/analytics",
  },
  {
    title: "Demo Scenarios",
    icon: <PlayCircle />,
    path: "/demo-scenarios",
  },
];

const MenuSection = ({ title, items }) => (
  <>
    <Typography
      sx={{
        px: 3,
        pt: 3,
        pb: 1,
        color: "#94A3B8",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 1,
      }}
    >
      {title}
    </Typography>

    <List sx={{ px: 2 }}>
      {items.map((item) => (
        <ListItemButton
          key={item.title}
          component={NavLink}
          to={item.path}
          sx={{
            borderRadius: 3,
            mb: 0.5,
            py: 1.2,

            color: "#CBD5E1",

            "& .MuiListItemIcon-root": {
              color: "#94A3B8",
              minWidth: 40,
            },

            "&.active": {
              bgcolor: "#2563EB",
              color: "#FFFFFF",

              "& .MuiListItemIcon-root": {
                color: "#FFFFFF",
              },
            },

            "&:hover": {
              bgcolor: "#1E293B",
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>

          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: 500,
            }}
          />
        </ListItemButton>
      ))}
    </List>
  </>
);

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 280,
        bgcolor: "#0F172A",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #1E293B",
      }}
    >
      {/* Logo */}

      <Box
        sx={{
          px: 3,
          py: 4,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
        >
          ⚡ FlowPilot
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#94A3B8",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          Performance Review
          <br />
          Workflow Automation Platform
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#1E293B" }} />

      <MenuSection
        title="MAIN"
        items={mainMenu}
      />

      <Divider
        sx={{
          my: 2,
          borderColor: "#1E293B",
        }}
      />

      <MenuSection
        title="OPERATIONS"
        items={operationsMenu}
      />

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ borderColor: "#1E293B" }} />

      <Box
        sx={{
          p: 3,
        }}
      >
        <Typography
          sx={{
            color: "#CBD5E1",
            fontWeight: 600,
          }}
        >
          Michael Johnson
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
            fontSize: 13,
          }}
        >
          HR Administrator
        </Typography>
      </Box>
    </Box>
  );
}