import { useTheme } from "../../contexts/ThemeContext";
import { MoonFill, SunFill } from "react-bootstrap-icons";

const ThemeSettings = () => {
  const { darkMode, setDarkMode } = useTheme();

  const handleThemeChange = (mode) => {
    setDarkMode(mode === "dark");
  };

  return (
    <div>
      <p className="bold" style={{ fontSize: 17 }}>
        Theme
      </p>
      <div className="py-4 d-flex gap-3">
        <div
          onClick={() => handleThemeChange("light")}
          className={`theme-option card bg-transparent p-3 ${!darkMode ? "selected" : ""}`}
          style={{
            cursor: "pointer",
            border: !darkMode
              ? "2px solid var(--color-primary)"
              : "1px solid #ddd",
            boxShadow: !darkMode
              ? "0px 0px 5px rgba(0, 123, 255, 0.5)"
              : "none",
            textAlign: "center",
          }}
        >
          <SunFill size={24} style={{ marginBottom: "10px" }} />
          <p>Light Theme</p>
        </div>
        <div
          onClick={() => handleThemeChange("dark")}
          className={`theme-option card bg-transparent p-3 ${darkMode ? "selected" : ""}`}
          style={{
            cursor: "pointer",
            border: darkMode
              ? "2px solid var(--color-primary)"
              : "1px solid #ddd",
            boxShadow: darkMode ? "0px 0px 5px rgba(0, 123, 255, 0.5)" : "none",
            textAlign: "center",
          }}
        >
          <MoonFill size={24} style={{ marginBottom: "10px" }} />
          <p>Dark Theme</p>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
