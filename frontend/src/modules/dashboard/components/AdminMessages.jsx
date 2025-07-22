import { useEffect, useState } from "react";
import { Box, Typography, Collapse, Paper } from "@mui/material";
import { getNotifications } from "../../common/api/notifications";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getNotifications();
        setMessages(res.notifications.slice(0, 3));
      } catch (e) {
        console.error("Failed to load messages", e);
      }
    };
    fetchMessages();
  }, []);

  if (messages.length === 0) return null;

  return (
    <Box sx={{ mb: 3 }}>
      {messages.map((msg) => (
        <Collapse in key={msg.id} timeout={600}>
          <Paper sx={{ p: 2, mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {msg.title}
            </Typography>
          </Paper>
        </Collapse>
      ))}
    </Box>
  );
}
