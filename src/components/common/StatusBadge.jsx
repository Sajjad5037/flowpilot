import { Chip } from "@mui/material";

const statusConfig = {
  active: {
    label: "Active",
    background: "#DCFCE7",
    color: "#15803D",
  },

  completed: {
    label: "Completed",
    background: "#DBEAFE",
    color: "#1D4ED8",
  },

  pending: {
    label: "Pending",
    background: "#FEF3C7",
    color: "#B45309",
  },

  overdue: {
    label: "Overdue",
    background: "#FEE2E2",
    color: "#B91C1C",
  },

  scheduled: {
    label: "Scheduled",
    background: "#E0E7FF",
    color: "#4338CA",
  },

  draft: {
    label: "Draft",
    background: "#F1F5F9",
    color: "#475569",
  },

  cancelled: {
    label: "Cancelled",
    background: "#F3F4F6",
    color: "#6B7280",
  },

  success: {
    label: "Success",
    background: "#DCFCE7",
    color: "#15803D",
  },

  warning: {
    label: "Warning",
    background: "#FEF3C7",
    color: "#B45309",
  },

  error: {
    label: "Error",
    background: "#FEE2E2",
    color: "#B91C1C",
  },
};

export default function StatusBadge({
  status = "pending",
  label,
  size = "small",
}) {
  const config =
    statusConfig[status.toLowerCase()] ??
    statusConfig.pending;

  return (
    <Chip
      size={size}
      label={label ?? config.label}
      sx={{
        backgroundColor: config.background,
        color: config.color,

        fontWeight: 600,
        fontSize: 12,

        borderRadius: "999px",

        height: 28,

        "& .MuiChip-label": {
          px: 1.75,
        },
      }}
    />
  );
}