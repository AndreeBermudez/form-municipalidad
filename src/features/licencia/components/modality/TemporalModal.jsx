import { Box, Modal, Paper, TextField, Typography, Button } from '@mui/material';

export const TemporalModal = ({ open, onClose, dates, setDates, onConfirm }) => {
 

  const hoy = new Date().toLocaleDateString('en-CA'); 

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 500,
          p: 4,
          borderRadius: '12px',
          backgroundColor: 'white',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          outline: 'none',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#2c3e50' }}>
          Licencia Temporal
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>
          Seleccione la fecha final de plazo.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            mb: 3,
          }}
        >
          <TextField
            fullWidth
            label="Plazo"
            type="date"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: hoy }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 3,
          }}
        >
          <Button variant="contained" color="inherit" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => onConfirm(dates)}
            disabled={!dates}
          >
            Continuar
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};
