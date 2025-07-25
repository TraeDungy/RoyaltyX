import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box } from "@mui/material";
import { X } from "lucide-react";

const GRAPH_TYPES = [
  { id: "line", label: "Line" },
  { id: "bar", label: "Bar" },
  { id: "sharp", label: "Sharp line" },
  { id: "pie", label: "Pie" },
];

export const GraphTypeSelector = ({ open, onClose, onSelectType }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 2 }}
      >
        <Typography variant="h5">Select graph type</Typography>
        <IconButton onClick={onClose} size="small">
          <X />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 1, pb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {GRAPH_TYPES.map((type) => (
            <Box
              key={type.id}
              component="button"
              onClick={() => onSelectType(type.id)}
              sx={{
                px: 2,
                py: 1,
                borderRadius: 1,
                textAlign: "left",
                backgroundColor: "action.hover",
                '&:hover': {
                  backgroundColor: 'action.selected',
                },
              }}
            >
              <Typography variant="body1">{type.label}</Typography>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default GraphTypeSelector;
