import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";

const typeOptions = [
  { value: "welcome", label: "Welcome" },
  { value: "password_reset", label: "Password Reset" },
  { value: "custom", label: "Custom" },
];

export default function EmailTemplateForm({ initialData = {}, onSubmit, buttonLabel = "Save" }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    body_html: "",
    template_type: "custom",
    ...initialData,
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, ...initialData }));
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors({});
      await onSubmit(formData);
    } catch (err) {
      setErrors(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: "auto", my: 3 }}>
      <Typography variant="h4" mb={2}>Email Template</Typography>
      <TextField
        required
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        required
        fullWidth
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        select
        fullWidth
        label="Template Type"
        name="template_type"
        value={formData.template_type}
        onChange={handleChange}
        margin="normal"
      >
        {typeOptions.map((o) => (
          <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
        ))}
      </TextField>
      <TextField
        multiline
        rows={10}
        fullWidth
        label="HTML Body"
        name="body_html"
        value={formData.body_html}
        onChange={handleChange}
        margin="normal"
      />
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Preview</Typography>
        <Box
          sx={{ border: "1px solid #ccc", p: 2, minHeight: 100 }}
          dangerouslySetInnerHTML={{ __html: formData.body_html }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button type="submit" variant="contained">{buttonLabel}</Button>
      </Box>
    </Box>
  );
}
