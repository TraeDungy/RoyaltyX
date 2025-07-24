import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Slider,
  MenuItem,
} from "@mui/material";
import { CheckCircle } from "react-bootstrap-icons";
import { DEFAULT_TEMPLATE } from "./defaultTemplate";

function loadTemplates() {
  try {
    const stored = JSON.parse(localStorage.getItem("pdfTemplates") || "[]");
    if (Array.isArray(stored) && stored.length > 0) {
      return stored.map((t) => ({ ...DEFAULT_TEMPLATE, ...t }));
    }
  } catch {
    /* ignore */
  }
  return [{ ...DEFAULT_TEMPLATE }];
}

function saveTemplates(templates) {
  localStorage.setItem("pdfTemplates", JSON.stringify(templates));
}

function loadActiveTemplateId() {
  return localStorage.getItem("activeTemplateId") || DEFAULT_TEMPLATE.id;
}

function saveActiveTemplateId(id) {
  localStorage.setItem("activeTemplateId", id);
}

export default function TemplateBuilder() {
  const [templates, setTemplates] = useState(loadTemplates());
  const [activeId, setActiveId] = useState(loadActiveTemplateId());
  const [current, setCurrent] = useState(
    () => templates.find((t) => t.id === activeId) || templates[0],
  );
  const [tab, setTab] = useState(0);
  const [zoom, setZoom] = useState(75);

  // Save templates when changed
  useEffect(() => {
    saveTemplates(templates);
  }, [templates]);

  // Save active template id when changed
  useEffect(() => {
    saveActiveTemplateId(activeId);
  }, [activeId]);

  const handleFieldChange = (section, field, value) => {
    setCurrent((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleNameChange = (value) => {
    setCurrent((prev) => ({ ...prev, name: value }));
  };

  const handleSave = () => {
    let newId = current.id;
    setTemplates((prev) => {
      const existing = prev.find((t) => t.id === current.id);
      if (existing) {
        return prev.map((t) => (t.id === current.id ? current : t));
      }
      newId = Date.now().toString();
      const newTemplate = { ...current, id: newId };
      setCurrent(newTemplate);
      return [...prev, newTemplate];
    });
    setActiveId(newId);
  };

  const handleReset = () => {
    setCurrent({ ...DEFAULT_TEMPLATE, id: current.id, name: current.name });
  };

  const selectTemplate = (id) => {
    const t = templates.find((tpl) => tpl.id === id);
    if (t) setCurrent(t);
  };

  const activateTemplate = (id) => {
    setActiveId(id);
  };

  // Preview style helpers
  const previewStyle = {
    fontFamily: current.typography.bodyFont,
    fontSize: `${current.typography.bodyFontSize}pt`,
    color: current.colors.bodyText,
    backgroundColor: current.colors.pageBackground,
    padding: 16,
    margin: 0,
  };

  const headerStyle = {
    textAlign: current.layout.headerAlignment,
    backgroundColor: current.colors.primary,
    color: current.colors.bodyText,
    padding: 8,
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: current.layout.tableSpacing,
  };

  return (
    <Box sx={{ display: "flex", gap: 3, p: 2 }}>
      <Box sx={{ width: 280 }}>
        <Typography variant="h5" mb={1}>
          Templates
        </Typography>
        {templates.map((tpl) => (
          <Box
            key={tpl.id}
            sx={{
              p: 1,
              mb: 1,
              display: "flex",
              alignItems: "center",
              bgcolor: tpl.id === current.id ? "action.hover" : "transparent",
              cursor: "pointer",
            }}
            onClick={() => selectTemplate(tpl.id)}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: tpl.colors.primary,
                borderRadius: "4px",
                mr: 1,
              }}
            />
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {tpl.name}
            </Typography>
            {tpl.id === activeId ? (
              <CheckCircle color="green" data-testid={`active-${tpl.id}`} />
            ) : (
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  activateTemplate(tpl.id);
                }}
              >
                Activate
              </Button>
            )}
          </Box>
        ))}
        <TextField
          fullWidth
          label="Template Name"
          value={current.name}
          onChange={(e) => handleNameChange(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleSave}
            data-testid="save-btn"
          >
            Save & Activate
          </Button>
          <Button onClick={handleReset} data-testid="reset-btn">
            Reset
          </Button>
        </Box>
        <Tabs
          orientation="vertical"
          value={tab}
          onChange={(e, v) => setTab(v)}
          sx={{ mt: 2 }}
        >
          <Tab label="Colors" />
          <Tab label="Typography" />
          <Tab label="Layout" />
          <Tab label="Logo" />
          <Tab label="Tables" />
          <Tab label="Producer Info" />
          <Tab label="Custom" />
        </Tabs>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {tab === 0 && (
          <Box sx={{ maxWidth: 400 }}>
            <TextField
              type="color"
              label="Page Background"
              value={current.colors.pageBackground}
              onChange={(e) =>
                handleFieldChange("colors", "pageBackground", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              type="color"
              label="Body Text"
              value={current.colors.bodyText}
              onChange={(e) =>
                handleFieldChange("colors", "bodyText", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              type="color"
              label="Primary"
              value={current.colors.primary}
              onChange={(e) =>
                handleFieldChange("colors", "primary", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              type="color"
              label="Secondary"
              value={current.colors.secondary}
              onChange={(e) =>
                handleFieldChange("colors", "secondary", e.target.value)
              }
              fullWidth
              margin="normal"
            />
          </Box>
        )}
        {tab === 1 && (
          <Box sx={{ maxWidth: 400 }}>
            <TextField
              select
              label="Header Font"
              value={current.typography.headerFont}
              onChange={(e) =>
                handleFieldChange("typography", "headerFont", e.target.value)
              }
              fullWidth
              margin="normal"
            >
              {["Helvetica", "Times New Roman", "Georgia", "Verdana"].map(
                (f) => (
                  <MenuItem key={f} value={f}>
                    {f}
                  </MenuItem>
                ),
              )}
            </TextField>
            <TextField
              select
              label="Body Font"
              value={current.typography.bodyFont}
              onChange={(e) =>
                handleFieldChange("typography", "bodyFont", e.target.value)
              }
              fullWidth
              margin="normal"
            >
              {["Helvetica", "Times New Roman", "Georgia", "Verdana"].map(
                (f) => (
                  <MenuItem key={f} value={f}>
                    {f}
                  </MenuItem>
                ),
              )}
            </TextField>
            <TextField
              label="Header Font Size"
              type="number"
              inputProps={{ min: 16, max: 32 }}
              value={current.typography.headerFontSize}
              onChange={(e) =>
                handleFieldChange(
                  "typography",
                  "headerFontSize",
                  Number(e.target.value),
                )
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Body Font Size"
              type="number"
              inputProps={{ min: 8, max: 16 }}
              value={current.typography.bodyFontSize}
              onChange={(e) =>
                handleFieldChange(
                  "typography",
                  "bodyFontSize",
                  Number(e.target.value),
                )
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Label Font Size"
              type="number"
              inputProps={{ min: 6, max: 14 }}
              value={current.typography.labelFontSize}
              onChange={(e) =>
                handleFieldChange(
                  "typography",
                  "labelFontSize",
                  Number(e.target.value),
                )
              }
              fullWidth
              margin="normal"
            />
          </Box>
        )}
        {tab === 2 && (
          <Box sx={{ maxWidth: 400 }}>
            <TextField
              select
              label="Header Alignment"
              value={current.layout.headerAlignment}
              onChange={(e) =>
                handleFieldChange("layout", "headerAlignment", e.target.value)
              }
              fullWidth
              margin="normal"
            >
              {["left", "center", "right"].map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              type="number"
              label="Table Spacing"
              value={current.layout.tableSpacing}
              onChange={(e) =>
                handleFieldChange(
                  "layout",
                  "tableSpacing",
                  Number(e.target.value),
                )
              }
              fullWidth
              margin="normal"
            />
            <TextField
              type="number"
              label="Page Margins"
              value={current.layout.pageMargins}
              onChange={(e) =>
                handleFieldChange(
                  "layout",
                  "pageMargins",
                  Number(e.target.value),
                )
              }
              fullWidth
              margin="normal"
            />
          </Box>
        )}
        {tab === 3 && (
          <Box sx={{ maxWidth: 400 }}>
            <Button component="label" variant="outlined" sx={{ mb: 1 }}>
              Upload Logo
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  if (file) {
                    handleFieldChange("logo", "url", URL.createObjectURL(file));
                  }
                }}
              />
            </Button>
            <TextField
              label="Width (px)"
              type="number"
              value={current.logo.width}
              onChange={(e) =>
                handleFieldChange("logo", "width", Number(e.target.value))
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Height (px)"
              type="number"
              value={current.logo.height}
              onChange={(e) =>
                handleFieldChange("logo", "height", Number(e.target.value))
              }
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Alignment"
              value={current.logo.alignment}
              onChange={(e) =>
                handleFieldChange("logo", "alignment", e.target.value)
              }
              fullWidth
              margin="normal"
            >
              {["left", "center", "right"].map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}
        {tab === 4 && (
          <Box sx={{ maxWidth: 400 }}>
            <TextField
              select
              label="Show Borders"
              value={current.tables.showBorders ? "yes" : "no"}
              onChange={(e) =>
                handleFieldChange(
                  "tables",
                  "showBorders",
                  e.target.value === "yes",
                )
              }
              fullWidth
              margin="normal"
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </TextField>
            <TextField
              type="number"
              label="Border Width"
              value={current.tables.borderWidth}
              onChange={(e) =>
                handleFieldChange(
                  "tables",
                  "borderWidth",
                  Number(e.target.value),
                )
              }
              fullWidth
              margin="normal"
            />
            <TextField
              type="color"
              label="Border Color"
              value={current.tables.borderColor}
              onChange={(e) =>
                handleFieldChange("tables", "borderColor", e.target.value)
              }
              fullWidth
              margin="normal"
            />
          </Box>
        )}
        {tab === 5 && (
          <Box sx={{ maxWidth: 400 }}>
            <TextField
              select
              label="Include Producer Info"
              value={current.producerInfo.include ? "yes" : "no"}
              onChange={(e) =>
                handleFieldChange(
                  "producerInfo",
                  "include",
                  e.target.value === "yes",
                )
              }
              fullWidth
              margin="normal"
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </TextField>
          </Box>
        )}
        {tab === 6 && (
          <Box sx={{ maxWidth: 400 }}>
            <TextField
              label="Content Before Report"
              multiline
              value={current.custom.beforeReport}
              onChange={(e) =>
                handleFieldChange("custom", "beforeReport", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Content After Report"
              multiline
              value={current.custom.afterReport}
              onChange={(e) =>
                handleFieldChange("custom", "afterReport", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Footer Note"
              multiline
              value={current.custom.footerNote}
              onChange={(e) =>
                handleFieldChange("custom", "footerNote", e.target.value)
              }
              fullWidth
              margin="normal"
            />
          </Box>
        )}
      </Box>
      <Box sx={{ flexGrow: 1, border: "1px solid #ccc", ml: 2, p: 2 }}>
        <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            Zoom
          </Typography>
          <Slider
            size="small"
            value={zoom}
            min={25}
            max={150}
            onChange={(e, v) => setZoom(v)}
            sx={{ width: 120 }}
          />
          <Button onClick={() => setZoom(75)} sx={{ ml: 1 }} size="small">
            Reset
          </Button>
        </Box>
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top left",
          }}
        >
          <div style={previewStyle} data-testid="preview">
            <div style={headerStyle}>
              {current.logo.url && (
                <img
                  src={current.logo.url}
                  style={{
                    width: current.logo.width,
                    height: current.logo.height,
                    objectFit: "contain",
                    float: current.logo.alignment,
                  }}
                  alt="logo"
                />
              )}
              <div>Company Address</div>
            </div>
            <h2
              style={{
                fontSize: current.typography.headerFontSize,
                fontFamily: current.typography.headerFont,
              }}
            >
              Sample Report
            </h2>
            <table
              style={tableStyle}
              border={current.tables.showBorders ? 1 : 0}
            >
              <thead style={{ backgroundColor: current.colors.tableHeader }}>
                <tr>
                  <th align="left">Title</th>
                  <th align="right">Sales</th>
                  <th align="right">Impressions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Product A</td>
                  <td align="right">$10</td>
                  <td align="right">100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Box>
    </Box>
  );
}
