import { useState, useEffect } from "react";
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";

export default function EmailTemplateForm({ initialData = {}, onSubmit, buttonLabel = "Create" }) {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    content: "",
    is_active: true,
    ...initialData,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
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
        error={Boolean(errors.name)}
        helperText={errors.name}
        margin="normal"
      />
      <TextField
        required
        fullWidth
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        error={Boolean(errors.subject)}
        helperText={errors.subject}
        margin="normal"
      />
      <TextField
        required
        fullWidth
        multiline
        minRows={4}
        label="Content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        error={Boolean(errors.content)}
        helperText={errors.content}
        margin="normal"
      />
      <FormControlLabel
        control={<Checkbox checked={formData.is_active} onChange={handleChange} name="is_active" />}
        label="Active"
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button type="submit" variant="contained">
          {buttonLabel}
        </Button>
      </Box>
    </Box>
  );
}
