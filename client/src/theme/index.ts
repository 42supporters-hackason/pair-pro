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
      light: "#d4d4d4",
      main: "#cccccc",
      dark: "#aaaaaa",
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
