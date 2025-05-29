import { useTheme } from "../../contexts/ThemeContext";
import { MoonFill, SunFill } from "react-bootstrap-icons";

const ThemeSettings = () => {
  const { darkMode, setDarkMode } = useTheme();

  const handleThemeChange = (mode) => {
    setDarkMode(mode === "dark");
  };

  return (
    <div>
      <p className="bold mb-3" style={{ fontSize: 19 }}>
        Theme Settings
      </p>
      <div className="py-4 d-flex gap-3">
        <div
          onClick={() => handleThemeChange("light")}
          className={`theme-option rounded-lg bg-transparent p-3 ${!darkMode ? "selected" : ""}`}
          style={{
            cursor: "pointer",
            border: !darkMode
              ? "2px solid var(--color-primary)"
              : "1px solid var(--color-subtle)",
            textAlign: "center",
          }}
        >
          <SunFill size={24} className="m-auto mb-3 text-warning" />
          <p>Light Theme</p>
        </div>
        <div
          onClick={() => handleThemeChange("dark")}
          className={`theme-option rounded-lg bg-transparent p-3 ${darkMode ? "selected" : ""}`}
          style={{
            cursor: "pointer",
            border: darkMode
              ? "2px solid var(--color-primary)"
              : "1px solid var(--color-subtle)",
            textAlign: "center",
          }}
        >
          <MoonFill size={24} className="m-auto mb-3 txt-primary" />
          <p>Dark Theme</p>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
