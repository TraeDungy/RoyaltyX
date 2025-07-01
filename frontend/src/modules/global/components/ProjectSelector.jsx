import { Box, Divider, Link, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../account/api/user";
import { ChevronDown, Folder } from "lucide-react";
import { getMyProjects, switchProject } from "../../projects/api/project";

export const ProjectSelector = () => {
  const [projectMenuAnchor, setProjectMenuAnchor] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [myProjects, setMyProjects] = useState([]);
  const handleProjectMenuOpen = (event) => {
    setProjectMenuAnchor(event.currentTarget);
  };
  const handleSwitchProject = async (project_id) => {
    try {
      await switchProject(project_id);
      window.location.reload();
    } catch (error) {
      console.error("Error switching project:", error);
    }
    handleProjectMenuClose();
  };

  const handleProjectMenuClose = () => {
    setProjectMenuAnchor(null);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const fetchedUserInfo = await getUserInfo();
        setUserInfo(fetchedUserInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }

      try {
        const fetchedMyProjects = await getMyProjects();
        setMyProjects(fetchedMyProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 1,
            pr: 2,
            backgroundColor: "action.hover",
            borderRadius: 2,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            flex: 1,
            mr: 1,
            "&:hover": {
              backgroundColor: "action.selected",
            },
          }}
          onClick={handleProjectMenuOpen}
        >
          <Box sx={{ display: "flex", alignItems: "center", px: 1 }}>
            <Folder
              size={18}
              color="var(--color-text-lighter)"
              style={{ marginRight: 8 }}
            />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {userInfo?.project?.name ||
                userInfo?.currently_selected_project?.name}
            </Typography>
          </Box>
          <ChevronDown size={18} style={{ marginLeft: "auto" }} />
        </Paper>
      </Box>

      <Menu
        anchorEl={projectMenuAnchor}
        open={Boolean(projectMenuAnchor)}
        onClose={handleProjectMenuClose}
        PaperProps={{
          sx: { width: 230, mt: 1 },
        }}
      >
        {myProjects.map((myProject) => (
          <MenuItem
            key={myProject.id}
            onClick={() => handleSwitchProject(myProject.id)}
            sx={{ py: 1 }}
          >
            {myProject?.name}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          component={Link}
          to="/my-projects"
          onClick={handleProjectMenuClose}
          sx={{ color: "primary.main", fontWeight: 500 }}
        >
          View all
        </MenuItem>
      </Menu>
    </Box>
  );
};
