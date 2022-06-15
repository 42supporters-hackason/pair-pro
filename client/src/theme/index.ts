import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#f0f0fc",
      main: "#464AA6",
      dark: "#1B208C",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fcd7a9",
      main: "#fcba68",
      dark: "#f7a239",
      contrastText: "#fff",
    },
    error: {
      light: "#e1a436",
      main: "#cc7013",
      dark: "#c15b0f",
      contrastText: "#fff",
    },
    success: {
      light: "#5efc82",
      main: "#00c853",
      dark: "#009624",
      contrastText: "#fff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1025,
      xl: 1536,
    },
  },
});
