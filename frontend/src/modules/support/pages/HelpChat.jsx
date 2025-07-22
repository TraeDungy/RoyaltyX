import { useState } from "react";
import { Box, TextField, IconButton, Paper, Typography } from "@mui/material";
import { Send } from "lucide-react";
import { useHelpAssistant } from "../api/support";

function HelpChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { sendQuestion, loading } = useHelpAssistant();

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    try {
      const reply = await sendQuestion(input);
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, I couldn't process that." },
      ]);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Help Chat
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, height: 300, overflowY: "auto", mb: 2 }}>
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            sx={{
              textAlign: msg.sender === "user" ? "right" : "left",
              mb: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                display: "inline-block",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                backgroundColor:
                  msg.sender === "user" ? "primary.main" : "grey.200",
                color:
                  msg.sender === "user" ? "primary.contrastText" : "text.primary",
              }}
            >
              {msg.text}
            </Typography>
          </Box>
        ))}
      </Paper>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask a question..."
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={loading || !input.trim()}
        >
          <Send size={20} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default HelpChat;
