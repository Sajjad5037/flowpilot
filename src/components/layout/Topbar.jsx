import { useEffect, useState } from "react";

import notificationService from "../../services/notificationService";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputBase,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export default function Topbar() {
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };
  useEffect(() => {
  async function loadNotifications() {
  try {
    const data = await notificationService.getTopbarNotifications();
    setNotifications(data);
  } catch (error) {
    console.error("Failed to load notifications:", error);
  }
}

  loadNotifications();
}, []);


  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#0F172A",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <Toolbar
        sx={{
          height: 72,
          display: "flex",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        {/* Search */}

        <Paper
          elevation={0}
          sx={{
            width: 420,
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 0.5,
            border: "1px solid #E2E8F0",
            borderRadius: "14px",
            backgroundColor: "#F8FAFC",
          }}
        >
          <SearchIcon
            sx={{
              color: "#94A3B8",
              mr: 1,
            }}
          />

          <InputBase
            placeholder="Search reviews, employees..."
            sx={{
              flex: 1,
            }}
          />
        </Paper>

        {/* Right Side */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>

          {/* Notifications */}

          <IconButton onClick={handleNotificationOpen}>
            <Badge
                badgeContent={notifications.length}
                color="error"
            >
              <NotificationsNoneRoundedIcon />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleNotificationClose}
            PaperProps={{
              sx: {
                width: 380,
                mt: 1.5,
                borderRadius: 3,
                boxShadow: "0 12px 30px rgba(15,23,42,.12)",
              },
            }}
          >
            <Typography
              sx={{
                px: 2,
                py: 1.5,
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              🔔 Notifications ({notifications.length})
            </Typography>

            <Divider />

            {notifications.map((notification) => (
                <MenuItem
                    key={notification.id}
                    onClick={handleNotificationClose}
                >
                    <ListItemText
                        primary={notification.message}
                    />
                </MenuItem>
            ))}

            <Divider />

            <MenuItem
              onClick={handleNotificationClose}
              sx={{
                justifyContent: "center",
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              View All Notifications →
            </MenuItem>
          </Menu>

          {/* User */}

          <Avatar
            sx={{
              bgcolor: "#2563EB",
            }}
          >
            M
          </Avatar>

          <Box>
            <Typography
              fontWeight={700}
              fontSize={14}
            >
              Michael Johnson
            </Typography>

            <Typography
              fontSize={12}
              color="text.secondary"
            >
              HR Administrator
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}