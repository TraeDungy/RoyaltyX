import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import {
  usePageCustomization,
  useUpdatePageCustomization,
} from "../api/pageCustomization";

const pages = [
  { value: "landing", label: "Landing" },
  { value: "login", label: "Login" },
  { value: "signup", label: "Signup" },
];

export default function PageCustomization() {
  const [selectedPage, setSelectedPage] = useState("landing");
  const { data, refetch } = usePageCustomization(selectedPage);
  const { mutate, loading } = useUpdatePageCustomization(selectedPage);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    backgroundColor: "",
  });

  useEffect(() => {
    if (data?.data) {
      setForm({
        title: data.data.title || "",
        subtitle: data.data.subtitle || "",
        backgroundColor: data.data.backgroundColor || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutate({ data: form });
    refetch();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
        Page Customization
      </Typography>
      <TextField
        select
        label="Page"
        value={selectedPage}
        onChange={(e) => setSelectedPage(e.target.value)}
        sx={{ mb: 3 }}
      >
        {pages.map((p) => (
          <MenuItem key={p.value} value={p.value}>
            {p.label}
          </MenuItem>
        ))}
      </TextField>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 400,
          }}
        >
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <TextField
            label="Subtitle"
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
          />
          <TextField
            label="Background Color"
            name="backgroundColor"
            value={form.backgroundColor}
            onChange={handleChange}
          />
          <Button variant="contained" type="submit" disabled={loading}>
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
