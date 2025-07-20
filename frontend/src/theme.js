import { createTheme } from "@mui/material/styles";
import { colors } from "./constants";

export const getMuiTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: colors[mode].primary,
        lighter: colors[mode].textLighter,
      },
      error: {
        main: colors[mode].danger,
      },
      background: {
        default: colors[mode].bodyBackground,
        paper: colors[mode].paper,
      },
      text: {
        primary: colors[mode].text,
        secondary: colors[mode].textLighter,
      },
    },
    typography: {
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600,
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 500,
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 500,
        lineHeight: 1.8,
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 400,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 400,
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h1: "h1",
            h2: "h2",
            h3: "h3",
            h4: "h4",
            h5: "h5",
            h6: "h6",
            subtitle1: "h2",
            subtitle2: "h2",
            body1: "span",
            body2: "span",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: mode === "dark" ? "none" : 3,
          },
        },
      },
    },
  });
};
