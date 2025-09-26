import {
  Drawer, Box, Typography, IconButton, List, ListItem, ListItemText, Divider, Button
} from '@mui/material';
import { Close, Add, Remove, Delete } from '@mui/icons-material';
import { useCardCtx } from '../../context/useCardCtx';

export default function CardDrawer() {
  const { state, close, remove, add, clear, clearOneMovie, totalPrice } = useCardCtx();

  return (
    <Drawer anchor="right" open={state.isOpen} onClose={close}>
      <Box sx={{ width: 350, p: 2, display: 'flex', flexDirection: 'column', height: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Carrito</Typography>
          <IconButton onClick={close}><Close /></IconButton>
        </Box>

        <Divider />

        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
          {state.items.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <IconButton size="small" onClick={() => remove(item.id)}><Remove /></IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton size="small" onClick={() => add(item)}><Add /></IconButton>
                  <IconButton size="small" onClick={() => clearOneMovie(item.id)}><Delete color="error" /></IconButton>
                </Box>
              }
              sx={{ pr: 18 }} // Aumenta el padding derecho para evitar que el texto choque con los botones
            >
              <ListItemText
                primary={item.title}
                secondary={`$${item.price.toFixed(2)} c/u`}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        <Typography variant="h6" align="right">Total: ${totalPrice.toFixed(2)}</Typography>

        <Button variant="contained" color="error" fullWidth onClick={clear} sx={{ mt: 2 }}>
          Vaciar carrito
        </Button>
      </Box>
    </Drawer>
  );

}