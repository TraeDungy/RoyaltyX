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
  Typography,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Settings, Palette, LayoutGrid, CircleAlert } from "lucide-react";
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
          minHeight: '70vh',
          maxHeight: '90vh',
          backgroundColor: 'background.paper',
        }
      }}
    >
      <DialogContent sx={{ p: 0, display: 'flex', height: '100%' }}>
        <Box
          sx={{
            width: 250,
            borderRight: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <Box sx={{ p: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                }}
              >
                Settings
              </Typography>
              <IconButton
                onClick={handleClose}
                size="small"
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

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
                      '&.Mui-selected': {
                        backgroundColor: isDanger ? 'error.main' : 'primary.main',
                        color: isDanger ? 'error.contrastText' : 'primary.contrastText',
                        '&:hover': {
                          backgroundColor: isDanger ? 'error.dark' : 'primary.dark',
                        },
                        '& .MuiListItemIcon-root': {
                          color: isDanger ? 'error.contrastText' : 'primary.contrastText',
                        },
                      },
                      '&:hover': {
                        backgroundColor: isDanger ? 'error.light' : 'action.hover',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: isDanger && !isSelected ? 'error.main' : 'inherit',
                      }}
                    >
                      <IconComponent size={18} />
                    </ListItemIcon>
                    <ListItemText
                      primary={tab.label}
                      primaryTypographyProps={{
                        variant: 'body2',
                        fontWeight: isSelected ? 600 : 500,
                        color: isDanger && !isSelected ? 'error.main' : 'inherit',
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
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: 'background.paper',
          }}
        >
          {/* Content */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
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
