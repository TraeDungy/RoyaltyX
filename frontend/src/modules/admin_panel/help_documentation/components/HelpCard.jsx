import { useState } from "react";
import { Card, CardHeader, CardContent, Collapse, IconButton } from "@mui/material";
import { ChevronDown, ChevronUp } from "lucide-react";

const HelpCard = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = () => setOpen(!open);

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        title={title}
        action={
          <IconButton onClick={toggle} aria-label={open ? "Collapse" : "Expand"}>
            {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </IconButton>
        }
        onClick={toggle}
        sx={{ cursor: "pointer" }}
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CardContent>{children}</CardContent>
      </Collapse>
    </Card>
  );
};

export default HelpCard;
