import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import { Box, Container } from "@mui/material";

function AppLayout() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1,
        minWidth: 0, // Prevents flex item from overflowing
      }}>
        {/* Fixed Header */}
        <Header />
        
        {/* Scrollable Content Area */}
        <Box sx={{ 
          flex: 1,
          overflow: 'auto',
          backgroundColor: 'background.default'
        }}>
          <Container sx={{ 
            px: { xs: 2, sm: 4, md: 8 },
            py: 6,
            maxWidth: 'none !important', // Override default maxWidth
          }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default AppLayout;
