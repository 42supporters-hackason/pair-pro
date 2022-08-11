import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#f0f0fc",
      main: "#464AA6",
      dark: "#3F51B5",
      contrastText: "#fff",
    },
    secondary: {
      light: "#F8F8F8",
      main: "#cccccc",
      dark: "#555555",
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
