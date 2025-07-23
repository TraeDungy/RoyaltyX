import { createContext, useContext, useEffect, useState } from "react";

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

    document.body.classList.add("theme-transition");
    const timeout = setTimeout(() => {
      document.body.classList.remove("theme-transition");
    }, 300);

    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    return () => clearTimeout(timeout);
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
