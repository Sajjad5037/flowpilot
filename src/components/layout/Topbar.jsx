import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export default function Topbar() {
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

          <IconButton>
            <Badge
              badgeContent={5}
              color="error"
            >
              <NotificationsNoneRoundedIcon />
            </Badge>
          </IconButton>

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