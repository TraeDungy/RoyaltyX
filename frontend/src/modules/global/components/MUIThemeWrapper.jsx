import { ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { getMuiTheme } from "../../../theme";
import { useTheme } from "../../common/contexts/ThemeContext";

export const MUIThemeWrapper = ({ children }) => {
  const { theme, secondaryColor } = useTheme(); // "light" or "dark"
  const [muiTheme, setMuiTheme] = useState(() =>
    getMuiTheme(theme, secondaryColor),
  );

  useEffect(() => {
    setMuiTheme(getMuiTheme(theme, secondaryColor));
  }, [theme, secondaryColor]);

  return (
    <MUIThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};
