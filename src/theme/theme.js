import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2563EB",
    },

    secondary: {
      main: "#7C3AED",
    },

    success: {
      main: "#22C55E",
    },

    warning: {
      main: "#F59E0B",
    },

    error: {
      main: "#EF4444",
    },

    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#0F172A",
      secondary: "#64748B",
    },

    divider: "#E2E8F0",
  },

  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),

    h1: {
      fontSize: "2.25rem",
      fontWeight: 700,
    },

    h2: {
      fontSize: "1.75rem",
      fontWeight: 700,
    },

    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },

    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },

    h5: {
      fontSize: "1.1rem",
      fontWeight: 600,
    },

    body1: {
      fontSize: "0.95rem",
    },

    body2: {
      fontSize: "0.85rem",
      color: "#64748B",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 14,
  },

  spacing: 8,

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "#F8FAFC",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,

          boxShadow:
            "0 10px 30px rgba(15,23,42,.05)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,

          boxShadow:
            "0 10px 30px rgba(15,23,42,.05)",

          border: "1px solid #E2E8F0",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingLeft: 18,
          paddingRight: 18,
          height: 42,
          boxShadow: "none",

          "&:hover": {
            boxShadow:
              "0 10px 20px rgba(37,99,235,.15)",
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#FFFFFF",
          color: "#0F172A",
          boxShadow: "none",
          borderBottom: "1px solid #E2E8F0",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#0F172A",
          color: "#FFFFFF",
          borderRight: "none",
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,

          "&.Mui-selected": {
            background: "#2563EB",
            color: "#FFFFFF",
          },

          "&:hover": {
            background: "rgba(255,255,255,.08)",
          },
        },
      },
    },
  },
});

export default theme;