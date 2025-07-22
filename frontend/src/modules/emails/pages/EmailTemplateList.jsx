import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmailTemplates, deleteEmailTemplate } from "../api/templates";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { toast } from "react-toastify";

export default function EmailTemplateList() {
  const [templates, setTemplates] = useState([]);

  const load = async () => {
    const data = await getEmailTemplates();
    setTemplates(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    await deleteEmailTemplate(id);
    toast.success("Deleted");
    load();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">Email Templates</Typography>
        <Button component={Link} to="/email-templates/new" variant="contained">
          New Template
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.name}</TableCell>
              <TableCell>{t.template_type}</TableCell>
              <TableCell>
                <Button component={Link} to={`/email-templates/${t.id}`}>Edit</Button>
                <Button onClick={() => handleDelete(t.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
