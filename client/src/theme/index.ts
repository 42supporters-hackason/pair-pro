import type { Theme } from "@mui/material";
import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

const family = [
  '"Open Sans"',
  "Verdana",
  "Geneva",
  "Tahoma",
  "sans-serif",
].join(", ");

export const generateThemes = () => {
  // Create a base theme to extend
  const { typography, palette, shadows, breakpoints } = createTheme({
    typography: { fontSize: 14 },
  });

  // Create common styles to create light & dark themes from
  const commonThemeOptions: DeepPartial<Theme> = {
    palette: {
      primary: {
        light: "rgba(255, 125, 102, 1)",
        main: "rgba(229, 74, 59, 1)",
        dark: "rgba(172, 7, 19, 1)",
        contrastText: "#fff",
      },
      secondary: {
        light: "rgba(225, 255, 255, 1)",
        main: "rgba(175, 207, 207, 1)",
        dark: "rgba(127, 158, 158, 1)",
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
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: shadows[1],
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: 80,
          },
          regular: {
            [breakpoints.up("xs")]: {
              minHeight: 80,
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            [breakpoints.up("xs")]: {
              minWidth: 120,
            },
          },
          textColorInherit: {
            opacity: 1,
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            minHeight: 60,
          },
          flexContainer: {
            height: "100%",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            ":hover": {
              backgroundColor: "rgba(0, 0, 0, 0.03)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          elevation1: {
            boxShadow:
              "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)",
          },
          elevation2: {
            boxShadow:
              "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            ...typography.body1,
            borderBottom: `1px solid ${palette.divider}`,
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          gutterBottom: {
            marginBottom: 8,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          sizeSmall: {
            lineHeight: 1.3,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          size: "small",
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          disableFocusRipple: true,
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
        },
      },
    },
    typography: {
      fontSize: 14,
      fontFamily: family,
      h1: {
        fontFamily: family,
        fontWeight: 600,
        fontSize: typography.pxToRem(45),
        lineHeight: typography.pxToRem(50),
      },
      h2: {
        fontFamily: family,
        fontWeight: 600,
        fontSize: typography.pxToRem(29),
        lineHeight: typography.pxToRem(32),
      },
      h3: {
        fontFamily: family,
        fontWeight: 600,
        fontSize: typography.pxToRem(24),
        lineHeight: typography.pxToRem(28),
      },
      h4: {
        fontFamily: family,
        fontWeight: 600,
        fontSize: typography.pxToRem(20),
        lineHeight: typography.pxToRem(24),
      },
      h5: {
        fontFamily: family,
        fontWeight: 600,
        fontSize: typography.pxToRem(16),
        lineHeight: typography.pxToRem(20),
      },
      h6: {
        fontFamily: family,
        fontWeight: 600,
        fontSize: typography.pxToRem(14),
        lineHeight: typography.pxToRem(20),
      },
      subtitle1: {
        fontFamily: family,
        fontSize: typography.pxToRem(16),
        lineHeight: typography.pxToRem(25),
      },
      subtitle2: {
        fontFamily: family,
        fontWeight: 400,
        fontSize: typography.pxToRem(14),
        lineHeight: typography.pxToRem(21),
      },
      body1: {
        fontFamily: family,
        fontSize: "1rem",
        lineHeight: typography.pxToRem(21),
      },
      body2: {
        fontFamily: family,
        fontSize: typography.pxToRem(12),
        lineHeight: typography.pxToRem(20),
      },
      button: {
        fontFamily: family,
        fontSize: "1rem",
      },
      caption: {
        fontFamily: family,
        fontSize: typography.pxToRem(12),
        lineHeight: typography.pxToRem(13),
      },
      overline: {
        fontFamily: family,
        fontSize: typography.pxToRem(12),
        fontWeight: 500,
        textTransform: "uppercase",
      },
    },
  };

  const darkTheme = createTheme(
    {
      palette: { mode: "dark" },
      components: {
        MuiAutocomplete: {
          styleOverrides: {
            paper: {
              backgroundColor: grey[900],
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            elevation2: {
              backgroundColor: grey[700],
            },
          },
        },
      },
    },
    commonThemeOptions
  );

  const lightTheme = createTheme(
    {
      palette: {
        mode: "light",
        background: {
          default: "#fafafa",
        },
      },
    },
    commonThemeOptions
  );

  return { darkTheme, lightTheme };
};

export default generateThemes;
