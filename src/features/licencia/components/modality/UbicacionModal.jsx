import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TouchAppIcon from '@mui/icons-material/TouchApp';

const UbicacionModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{
          maxWidth: '400px',
          p: 3,
          textAlign: 'center',
          position: 'relative'
        }}
      >
    
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: (theme) => theme.palette.primary.light,
            mx: 'auto',
            mb: 2,
            position: 'relative'
          }}
        >
          <LocationOnIcon
            sx={{
              fontSize: 32,
              color: 'white',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </Box>

      
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Selecciona la ubicación
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Por favor, elige la ubicación de tu establecimiento en el mapa.
        </Typography>

    
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <TouchAppIcon
            sx={{
              fontSize: 40,
              color: (theme) => theme.palette.primary.main,
              animation: 'pulse 1.5s infinite'
            }}
          />
        
          <style>
            {`
              @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
              }
            `}
          </style>
        </Box>

        <DialogActions sx={{ justifyContent: 'center', pt: 3 }}>
          <Button variant="contained" onClick={onClose} sx={{ px: 4 }}>
            ENTENDIDO
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default UbicacionModal;
