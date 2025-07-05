import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { LayoutDashboard, HelpCircle, MessageSquare } from "lucide-react";
import icon from "../../../common/assets/img/brand/icon.webp";

const SIDEBAR_WIDTH = 240;

function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 855) {
        setSidebarOpen(false);
        document.documentElement.style.setProperty("--sidebar-width", "0");
      } else {
        setSidebarOpen(true);
        document.documentElement.style.setProperty(
          "--sidebar-width",
          `${SIDEBAR_WIDTH}px`
        );
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) {
      document.documentElement.style.setProperty(
        "--sidebar-width",
        `${SIDEBAR_WIDTH}px`
      );
    } else {
      document.documentElement.style.setProperty("--sidebar-width", "0");
    }
  };

  const isActivePage = (path) => {
    return location.pathname === path;
  };

  const SidebarContent = () => (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <List sx={{ px: 2 }}>
          <Box sx={{ py: 2, textAlign: "center" }}>
            <img src={icon} alt="logo" style={{ height: 50 }} />
          </Box>
          <Divider />
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              px: 2,
              pt: 2,
              pb: 1,
              display: "block",
            }}
          >
            Project
          </Typography>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/dashboard"
              selected={isActivePage("/admin/dashboard")}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                "&.Mui-selected": {
                  backgroundColor: "action.selected",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <LayoutDashboard size={18} color="var(--color-text-lighter)" />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{ variant: "body2", fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/support"
              selected={isActivePage("/admin/support")}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                "&.Mui-selected": {
                  backgroundColor: "action.selected",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <MessageSquare size={18} color="var(--color-text-lighter)" />
              </ListItemIcon>
              <ListItemText
                primary="Support"
                primaryTypographyProps={{
                  variant: "body2",
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/documentation"
              selected={isActivePage("/admin/documentation")}
              sx={{
                borderRadius: 2,
                mb: 1,
                "&.Mui-selected": {
                  backgroundColor: "action.selected",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <HelpCircle size={18} color="var(--color-text-lighter)" />
              </ListItemIcon>
              <ListItemText
                primary="Help Documentation"
                primaryTypographyProps={{
                  variant: "body2",
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={toggleSidebar}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: SIDEBAR_WIDTH,
            border: "none",
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={sidebarOpen}
      sx={{
        width: sidebarOpen ? SIDEBAR_WIDTH : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          border: "none",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <SidebarContent />
    </Drawer>
  );
}

export default Sidebar;
