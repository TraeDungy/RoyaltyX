import { useState } from "react";
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { createBanner } from "../../api/banners";
import { toast } from "react-toastify";

export default function BannerForm() {
  const [form, setForm] = useState({ title: "", message: "", image_url: "", video_url: "", is_active: true });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBanner(form);
      toast.success("Banner saved");
    } catch {
      toast.error("Failed to save banner");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: "auto", my: 3 }}>
      <Typography variant="h4" mb={2}>Banner</Typography>
      <TextField fullWidth label="Title" name="title" value={form.title} onChange={handleChange} margin="normal" required />
      <TextField fullWidth label="Message" name="message" value={form.message} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Image URL" name="image_url" value={form.image_url} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Video URL" name="video_url" value={form.video_url} onChange={handleChange} margin="normal" />
      <FormControlLabel control={<Checkbox checked={form.is_active} onChange={handleChange} name="is_active" />} label="Active" />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button type="submit" variant="contained">Save</Button>
      </Box>
    </Box>
  );
}
