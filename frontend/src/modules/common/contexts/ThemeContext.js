import { createContext, useContext, useEffect, useState } from "react";
import { colors } from "../../../constants";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedThemePreference = localStorage.getItem("themePreference");
    return savedThemePreference || "light";
  });

  const [secondaryColor, setSecondaryColor] = useState(() => {
    return localStorage.getItem("secondaryColor") || "#1976d2";
  });

  useEffect(() => {
    localStorage.setItem("themePreference", theme);
    const themeColors = colors[theme] || colors.light;
    const isDark = themeColors.mode === "dark";

    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    Object.entries({
      "--color-text": themeColors.text,
      "--color-text-lighter": themeColors.textLighter,
      "--color-body-background": themeColors.bodyBackground,
      "--color-light-contrast": themeColors.lightContrast,
      "--color-power-contrast": themeColors.powerContrast,
      "--color-subtle": themeColors.subtle,
      "--color-darker-gray": themeColors.darkerGray,
      "--color-danger": themeColors.danger,
      "--color-success": themeColors.success,
    }).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("secondaryColor", secondaryColor);
    document.documentElement.style.setProperty(
      "--color-primary",
      secondaryColor,
    );
    document.documentElement.style.setProperty(
      "--color-primary-lighter",
      `${secondaryColor}40`,
    );
    document.documentElement.style.setProperty(
      "--color-primary-hover",
      `${secondaryColor}d3`,
    );
  }, [secondaryColor]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, secondaryColor, setSecondaryColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
