import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Chip,
  Grid,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import { Delete as DeleteIcon, PersonAdd as PersonAddIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import AddMemberModal from "../components/AddMemberModal";
import { removeProjectMember } from "../api/members";
import { useProject } from "../../common/contexts/ProjectContext";

function Members() {
  const { project, setProject } = useProject();
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

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

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'owner':
        return 'primary';
      case 'admin':
        return 'secondary';
      case 'member':
        return 'default';
      default:
        return 'default';
    }
  };

  const getAvatarColor = (name) => {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    const index = name?.charCodeAt(0) % colors.length || 0;
    return colors[index];
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Project Members
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={handleOpenMembersModal}
          sx={{ borderRadius: 2 }}
        >
          Add Member
        </Button>
      </Box>

      {/* Members Grid */}
      {project?.users?.length > 0 ? (
        <Grid container spacing={3}>
          {project.users.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    elevation: 4,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2} alignItems="center">
                    {/* Avatar */}
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: getAvatarColor(user?.user_details?.name),
                        fontSize: '1.5rem',
                        fontWeight: 600,
                      }}
                    >
                      {user?.user_details?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </Avatar>

                    {/* Name */}
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        textAlign: 'center',
                        lineHeight: 1.2,
                      }}
                    >
                      {user?.user_details?.name || 'Unknown User'}
                    </Typography>

                    {/* Email */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: 'center',
                        wordBreak: 'break-word',
                      }}
                    >
                      {user?.user_details?.email}
                    </Typography>

                    {/* Role Chip */}
                    <Chip
                      label={user?.role || 'Member'}
                      color={getRoleColor(user?.role)}
                      size="small"
                      sx={{
                        fontWeight: 500,
                        textTransform: 'capitalize',
                      }}
                    />

                    <Divider sx={{ width: '100%', my: 1 }} />

                    {/* Actions */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <IconButton
                        onClick={() => handleRemoveProjectMember(user)}
                        color="error"
                        size="small"
                        sx={{
                          '&:hover': {
                            backgroundColor: 'error.light',
                            color: 'white',
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper
          elevation={1}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 3,
            backgroundColor: 'grey.50',
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
    </Box>
  );
}

export default Members;
