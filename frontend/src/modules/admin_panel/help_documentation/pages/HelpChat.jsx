import { useState } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import { apiUrl } from "../../../common/api/config";

const HelpChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/support/help/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ question: userMsg.content }),
      });
      const data = await res.json();
      if (data.answer) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.error }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error contacting server." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, m: "0 auto", p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Help Chat
      </Typography>
      <Paper sx={{ p: 2, minHeight: 300, mb: 2 }}>
        {messages.map((msg, idx) => (
          <Box key={idx} sx={{ mb: 1 }}>
            <Typography variant="body2" color={msg.role === "user" ? "primary" : "textSecondary"}>
              {msg.content}
            </Typography>
          </Box>
        ))}
      </Paper>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
        />
        <Button variant="contained" onClick={sendMessage} disabled={loading}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default HelpChat;
