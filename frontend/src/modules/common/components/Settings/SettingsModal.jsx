import { useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Settings, Palette, LayoutGrid, CircleAlert, X } from "lucide-react";
import GeneralSettings from "./GeneralSettings";
import ThemeSettings from "./ThemeSettings";
import DangerZone from "./DangerZone";
import ViewSettings from "./ViewSettings";

function SettingsModal({ showSettingsModal, setShowSettingsModal }) {
  const [selectedTab, setSelectedTab] = useState("general");

  const handleClose = () => setShowSettingsModal(false);

  const settingsTabs = [
    {
      id: "general",
      label: "General",
      icon: Settings,
      color: "inherit",
    },
    {
      id: "theme",
      label: "Theme",
      icon: Palette,
      color: "inherit",
    },
    {
      id: "view",
      label: "View",
      icon: LayoutGrid,
      color: "inherit",
    },
    {
      id: "danger",
      label: "Danger Zone",
      icon: CircleAlert,
      color: "error",
    },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "general":
        return <GeneralSettings />;
      case "theme":
        return <ThemeSettings />;
      case "view":
        return <ViewSettings />;
      case "danger":
        return <DangerZone />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <Dialog
      open={showSettingsModal}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          minHeight: "60vh",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogContent
        sx={{ p: 0, display: "flex", height: "100%", position: "relative" }}
      >
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            color: "text.secondary",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <X />
        </IconButton>
        <Box
          sx={{
            width: 250,
            borderRight: "1px solid",
            borderColor: "divider",
            display: "flex",
            backgroundColor: "background.paper",
            flexDirection: "column",
          }}
        >
          {/* Navigation List */}
          <List sx={{ px: 2, py: 2, flex: 1 }}>
            {settingsTabs.map((tab) => {
              const IconComponent = tab.icon;
              const isSelected = selectedTab === tab.id;
              const isDanger = tab.color === "error";

              return (
                <ListItem key={tab.id} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    selected={isSelected}
                    onClick={() => setSelectedTab(tab.id)}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      "&.Mui-selected": {
                        backgroundColor: "action.selected",
                        "&:hover": {
                          backgroundColor: "action.selected",
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color:
                          isDanger && !isSelected ? "error.main" : "inherit",
                      }}
                    >
                      <IconComponent size={18} />
                    </ListItemIcon>
                    <ListItemText
                      primary={tab.label}
                      primaryTypographyProps={{
                        variant: "body2",
                        color: isDanger ? "error.main" : "inherit",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* Content Area */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            backgroundColor: "background.paper",
          }}
        >
          {/* Content */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              p: 4,
            }}
          >
            {renderContent()}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsModal;
