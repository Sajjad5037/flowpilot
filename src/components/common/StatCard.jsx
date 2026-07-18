import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

import SectionCard from "./SectionCard";

export default function StatCard({
  title,
  value,
  subtitle,
  trend = "+12%",
  icon,
  color = "#2563EB",
}) {
  return (
    <SectionCard
      sx={{
        transition: "all .25s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 18px 40px rgba(15,23,42,.10)",
        },
      }}
    >
      <Stack
        spacing={3}
        height="100%"
      >
        {/* Top */}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {title}
            </Typography>

            <Typography
              variant="h3"
              mt={1}
              fontWeight={700}
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: 4,

              bgcolor: `${color}15`,

              color,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              "& svg": {
                fontSize: 30,
              },
            }}
          >
            {icon}
          </Box>
        </Stack>

        {/* Trend */}

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <TrendingUpRoundedIcon
            sx={{
              color: "#22C55E",
              fontSize: 18,
            }}
          />

          <Typography
            fontWeight={600}
            color="#22C55E"
            fontSize={14}
          >
            {trend}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {subtitle}
          </Typography>
        </Stack>

        {/* Footer */}

        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{
            cursor: "pointer",
            mt: "auto",
            color: "primary.main",

            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <Typography
            fontWeight={600}
            fontSize={14}
          >
            View Details
          </Typography>

          <ArrowForwardRoundedIcon
            sx={{
              fontSize: 18,
            }}
          />
        </Stack>
      </Stack>
    </SectionCard>
  );
}