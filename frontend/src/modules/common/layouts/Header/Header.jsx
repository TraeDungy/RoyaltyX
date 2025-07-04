import { useState } from "react";
import { 
  AppBar, 
  Toolbar, 
  Box, 
  IconButton, 
  Badge, 
  Avatar, 
  AvatarGroup, 
  Tooltip 
} from "@mui/material";
import { Settings, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import SettingsModal from "../../components/Settings/SettingsModal";
import NotificationsDropdown from "./NotificationsDropdown";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useProject } from "../../contexts/ProjectContext";

function Header() {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { project } = useProject();


  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "background.default",
          borderBottom: "1px solid",
          borderColor: "divider",
          color: "text.primary",
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 4 }, py: 1 }}>
          {/* Left side - Breadcrumbs */}
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Breadcrumbs />
          </Box>

          {/* Center - Project Member Avatars */}
          {project?.users && project.users.length > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}>
              <AvatarGroup 
                max={5} 
                sx={{ 
                  '& .MuiAvatar-root': { 
                    width: 23, 
                    height: 23, 
                    fontSize: '0.875rem',
                    border: '2px solid',
                    borderColor: 'background.paper',
                  }
                }}
              >
                {project.users.map((user) => (
                  <Tooltip 
                    key={user.id} 
                    title={`${user?.user_details?.name || 'Unknown'} (${user?.role || 'Member'})`}
                    arrow
                  >
                    <Avatar
                      src={user?.user_details?.avatar}
                      sx={{
                        cursor: 'pointer',
                      }}
                    >
                      {user?.user_details?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </Avatar>
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Box>
          )}

          {/* Right side - Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Settings Icon */}
            <IconButton
              onClick={() => setShowSettingsModal(true)}
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <Settings size={20} strokeWidth={1.5} />
            </IconButton>

            <IconButton
              component={Link}
              to="/inbox"
              size="small"
              sx={{
                color: "text.secondary",
                position: "relative",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <Badge
                badgeContent={0}
                showZero={false}
                color="error"
                overlap="circular"
                componentsProps={{
                  badge: {
                    sx: {
                      top: "auto",
                      bottom: 0,
                      right: 0,
                      transform: "translate(50%, 50%)",
                      fontSize: 9,
                      borderRadius: "0.375rem",
                      minWidth: 17,
                      height: 15.3,
                    },
                  },
                }}
              >
                <MessageSquare
                  size={20}
                  strokeWidth={1.5}
                  color="var(--color-text-lighter)"
                />
              </Badge>
            </IconButton>

            <NotificationsDropdown />
            <UserDropdown />
          </Box>
        </Toolbar>
      </AppBar>

      <SettingsModal
        showSettingsModal={showSettingsModal}
        setShowSettingsModal={setShowSettingsModal}
      />
    </>
  );
}

export default Header;
