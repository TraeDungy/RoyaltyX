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
      background: {
        default: colors[mode].bodyBackground,
        paper: colors[mode].bodyBackground,
      },
      text: {
        primary: colors[mode].text,
        secondary: colors[mode].textLighter,
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h1: "h2",
            h2: "h2",
            h3: "h2",
            h4: "h2",
            h5: "h2",
            h6: "h2",
            subtitle1: "h2",
            subtitle2: "h2",
            body1: "span",
            body2: "span",
          },
        },
      },
    },
  });
};
