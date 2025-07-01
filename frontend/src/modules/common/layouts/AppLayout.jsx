import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import { Box, Container } from "@mui/material";

function AppLayout() {
  return (
    <div className="page-content-wrapper">
      <Sidebar />
      <Box sx={{ width: "100%" }}>
        <Header />
        <Box>
          <Container sx={{ px: 8 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default AppLayout;
