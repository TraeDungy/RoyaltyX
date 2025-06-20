import { useTheme } from "../../contexts/ThemeContext";
import { MoonFill, SunFill } from "react-bootstrap-icons";

const ThemeSettings = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (theme) => {
    setTheme(theme);
  };

  return (
    <div>
      <p className="bold mb-3" style={{ fontSize: 19 }}>
        Theme Settings
      </p>
      <div className="py-4 d-flex gap-3">
        <div
          onClick={() => handleThemeChange("light")}
          className={`theme-option rounded-lg bg-transparent p-3 ${!theme ? "selected" : ""}`}
          style={{
            cursor: "pointer",
            border: theme === "light"
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
          className={`theme-option rounded-lg bg-transparent p-3 ${theme ? "selected" : ""}`}
          style={{
            cursor: "pointer",
            border: theme === "dark"
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
