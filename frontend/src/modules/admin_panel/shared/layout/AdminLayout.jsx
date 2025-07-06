import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { Box, Container } from "@mui/material";

function AdminLayout() {
  return (
    <div className="page-content-wrapper">
      <Sidebar />
      <Box sx={{ width: "100%" }}>
        <Box>
          <Container sx={{ px: 8 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default AdminLayout;
