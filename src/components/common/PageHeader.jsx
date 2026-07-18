import { Box, Typography } from "@mui/material";

export default function PageHeader({
  title,
  subtitle,
}) {
  return (
    <Box mb={4}>
      <Typography
        variant="h2"
        gutterBottom
      >
        {title}
      </Typography>

      <Typography
        color="text.secondary"
      >
        {subtitle}
      </Typography>
    </Box>
  );
}