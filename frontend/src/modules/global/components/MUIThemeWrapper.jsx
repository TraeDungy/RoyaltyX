import { ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { getMuiTheme } from "../../../theme";
import { useTheme } from "../../common/contexts/ThemeContext";

export const MUIThemeWrapper = ({ children }) => {
  const { theme } = useTheme(); // "light" or "dark"
  console.log(theme);
  const [muiTheme, setMuiTheme] = useState(() => getMuiTheme(theme));

  useEffect(() => {
    setMuiTheme(getMuiTheme(theme));
  }, [theme]);

  return (
    <MUIThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};
