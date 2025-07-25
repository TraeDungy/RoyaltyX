import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import AddMemberModal from "../components/AddMemberModal";
import { removeProjectMember } from "../api/members";
import { useProject } from "../../common/contexts/ProjectContext";
import PageHeader from "../../common/components/PageHeader";

function Members() {
  const { project, setProject } = useProject();
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleRemoveProjectMember = async (user) => {
    try {
      await removeProjectMember(user.id);
      toast.success("Successfully removed a project member!");
      setProject({
        ...project,
        users: project.users.filter((u) => u.id !== user.id),
      });
    } catch (error) {
      toast.error("Error while trying to remove a member!");
    }
  };

  const handleOpenMembersModal = () => {
    setShowAddMemberModal(true);
  };

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleRemoveFromMenu = () => {
    if (selectedUser) {
      handleRemoveProjectMember(selectedUser);
    }
    handleMenuClose();
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "owner":
        return "primary";
      case "admin":
        return "secondary";
      case "member":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <PageHeader
        title="Members"
        description="Add or remove users who are able to view this project."
        action={
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={handleOpenMembersModal}
          >
            Add Member
          </Button>
        }
      />

      {project?.users?.length > 0 ? (
        <TableContainer sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {project.users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        src={user?.user_details?.avatar}
                        sx={{
                          width: 40,
                          height: 40,
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        {user?.user_details?.name?.charAt(0)?.toUpperCase() ||
                          "U"}
                      </Avatar>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {user?.user_details?.name || "Unknown User"}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {user?.user_details?.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user?.role || "Member"}
                      color={getRoleColor(user?.role)}
                      size="small"
                      sx={{
                        fontWeight: 500,
                        textTransform: "capitalize",
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(event) => handleMenuOpen(event, user)}
                      size="small"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper
          elevation={1}
          sx={{
            p: 6,
            textAlign: "center",
            backgroundColor: "grey.50",
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No members found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Add members to your project to start collaborating
          </Typography>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={handleOpenMembersModal}
          >
            Add First Member
          </Button>
        </Paper>
      )}

      <AddMemberModal
        project={project}
        setProject={setProject}
        showAddMemberModal={showAddMemberModal}
        setShowAddMemberModal={setShowAddMemberModal}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleRemoveFromMenu} sx={{ color: "error.main" }}>
          <DeleteIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
          Remove from project
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Members;
