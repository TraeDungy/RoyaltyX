import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Star,
  BarChart2,
  ShoppingBag,
  Database,
  FileBarChart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ALL_ACTIONS = [
  {
    id: "analytics",
    title: "Analytics",
    description: "View insights",
    icon: <BarChart2 size={28} color="#1976d2" />,
    path: "/analytics",
  },
  {
    id: "products",
    title: "Products",
    description: "Manage your items",
    icon: <ShoppingBag size={28} color="#ed6c02" />,
    path: "/products",
  },
  {
    id: "sources",
    title: "Sources",
    description: "Connect data",
    icon: <Database size={28} color="#2e7d32" />,
    path: "/sources",
  },
  {
    id: "reports",
    title: "Reports",
    description: "View reports",
    icon: <FileBarChart size={28} color="#9c27b0" />,
    path: "/reports",
  },
];

const STORAGE_KEY = "userQuickActions";
const DEFAULT_STORAGE_KEY = "defaultQuickActions";

export const QuickActions = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      const defaults = localStorage.getItem(DEFAULT_STORAGE_KEY);
      return defaults ? JSON.parse(defaults) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const renderAction = (action) => (
    <Grid key={action.id} item xs={12} sm={6} md={3}>
      <Card
        sx={{
          cursor: "pointer",
          "&:hover": { boxShadow: 4 },
          position: "relative",
        }}
        onClick={() => navigate(action.path)}
      >
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(action.id);
          }}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <Star fill={favorites.includes(action.id) ? "#ffd700" : "none"} />
        </IconButton>
        <CardContent sx={{ textAlign: "center", py: 4 }}>
          {action.icon}
          <Typography variant="h6" sx={{ mt: 1 }}>
            {action.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {action.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  const favoriteActions = ALL_ACTIONS.filter((a) => favorites.includes(a.id));
  const otherActions = ALL_ACTIONS.filter((a) => !favorites.includes(a.id));

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Quick Actions
      </Typography>
      <Grid container spacing={2} sx={{ mb: favorites.length ? 3 : 0 }}>
        {favoriteActions.map(renderAction)}
      </Grid>
      {otherActions.length > 0 && (
        <Grid container spacing={2} sx={{ mt: favorites.length ? 2 : 0 }}>
          {otherActions.map(renderAction)}
        </Grid>
      )}
    </Box>
  );
};

export default QuickActions;
