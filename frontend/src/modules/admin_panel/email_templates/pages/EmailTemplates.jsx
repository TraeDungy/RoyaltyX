import { useEffect, useState } from "react";
import { Button, Box, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getEmailTemplates } from "../../api/emailTemplates";

export default function EmailTemplates() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEmailTemplates().then(setTemplates).catch(console.error);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={2}>Email Templates</Typography>
      <Button variant="contained" onClick={() => navigate("/admin/email-templates/create")}>Create New Template</Button>
      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Version</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.map((t) => (
            <TableRow key={t.id} onClick={() => navigate(`/admin/email-templates/${t.id}/edit`)} style={{ cursor: "pointer" }}>
              <TableCell>{t.name}</TableCell>
              <TableCell>{t.subject}</TableCell>
              <TableCell>{t.version}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
