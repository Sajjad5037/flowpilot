import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Divider from "@mui/material/Divider";
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
  unit,
  summary = [],
  action = "View Details",
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
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {unit}
            </Typography>

          </Box>

          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 4,

              bgcolor: `${color}15`,

              color,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              "& svg": {
                fontSize: 32,
              },
            }}
          >
            {icon}
          </Box>
        </Stack>

        {/* Trend */}

        <Divider />
        <Stack spacing={1}>
          {summary.map((item) => (
            <Stack
              key={item}
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <CheckCircleRoundedIcon
                sx={{
                  fontSize: 18,
                  color: "#22C55E",
                }}
              />

              <Typography variant="body2">
                {item}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Divider sx={{ mt: "auto" }} />

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
            {action}
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