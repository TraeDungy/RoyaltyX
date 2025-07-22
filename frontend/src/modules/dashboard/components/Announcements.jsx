import { useEffect, useState } from "react";
import { Box, Collapse, IconButton, Paper, Typography } from "@mui/material";
import { X } from "lucide-react";
import { getNotifications } from "../../common/api/notifications";

export const Announcements = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getNotifications();
        setMessages(response.notifications.slice(0, 3));
      } catch (error) {
        console.error("Error loading messages", error);
      }
    };
    fetchMessages();
  }, []);

  const [closed, setClosed] = useState([]);

  const handleClose = (id) => {
    setClosed((prev) => [...prev, id]);
  };

  return (
    <Box sx={{ mb: 3 }}>
      {messages.map((msg) => (
        <Collapse in={!closed.includes(msg.id)} key={msg.id}>
          <Paper
            sx={{ p: 2, display: "flex", alignItems: "center", mb: 1 }}
            elevation={3}
          >
            <Typography sx={{ flexGrow: 1 }}>{msg.title}</Typography>
            <IconButton size="small" onClick={() => handleClose(msg.id)}>
              <X size={16} />
            </IconButton>
          </Paper>
        </Collapse>
      ))}
    </Box>
  );
};

export default Announcements;
