import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#787CBF",
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
});
