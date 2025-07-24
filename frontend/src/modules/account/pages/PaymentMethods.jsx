import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import {
  getPaymentMethods,
  removePaymentMethod,
  setDefaultPaymentMethod,
} from "../api/payments";

function PaymentMethodsPage() {
  const [methods, setMethods] = useState([]);

  const fetchMethods = async () => {
    try {
      const data = await getPaymentMethods();
      setMethods(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const handleRemove = async (id) => {
    await removePaymentMethod(id);
    fetchMethods();
  };

  const handleSetDefault = async (id) => {
    await setDefaultPaymentMethod(id);
    fetchMethods();
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Payment Methods
      </Typography>
      <Paper>
        <List>
          {methods.map((pm) => (
            <ListItem
              key={pm.id}
              secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => handleRemove(pm.id)}>
                    <DeleteIcon />
                  </IconButton>
                  {!pm.is_default && (
                    <Button onClick={() => handleSetDefault(pm.id)}>Set Default</Button>
                  )}
                </>
              }
            >
              <ListItemText
                primary={`${pm.card.brand.toUpperCase()} ****${pm.card.last4}`}
                secondary={pm.is_default ? 'Default' : null}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default PaymentMethodsPage;
