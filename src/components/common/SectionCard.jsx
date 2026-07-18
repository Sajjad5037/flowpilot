import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
} from "@mui/material";

export default function SectionCard({
  title,
  subtitle,
  action,
  children,
  sx = {},
}) {
  return (
    <Card
      sx={{
        height: "100%",
        transition: "all .25s ease",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 20px 40px rgba(15,23,42,.08)",
        },

        ...sx,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {(title || subtitle || action) && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={3}
          >
            <Box>
              {title && (
                <Typography
                  variant="h5"
                  fontWeight={700}
                >
                  {title}
                </Typography>
              )}

              {subtitle && (
                <Typography
                  variant="body2"
                  mt={0.5}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>

            {action && action}
          </Stack>
        )}

        {children}
      </CardContent>
    </Card>
  );
}