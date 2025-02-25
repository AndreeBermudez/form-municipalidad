import React from 'react';
import { 
  Stepper, 
  Step, 
  StepLabel, 
  Box, 
  Paper, 
  Typography, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';

const ProgressSteps = ({ steps, currentStep }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <Paper
        sx={{
          width: '280px',         // Tamaño fijo para móviles
          height: '300px',         // Tamaño fijo para móviles
          overflowY: 'auto',       // Scroll vertical si el contenido excede
          boxShadow: 3,
          p: 2,
          flexShrink: 0,          // Evita que se encoja en un contenedor flex
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}
        >
          {steps[currentStep - 1]}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        width: '300px',         // Tamaño fijo para escritorio
        height: '600px',         // Tamaño fijo para escritorio
        overflowY: 'auto',       // Scroll vertical si el contenido excede
        boxShadow: 3,
        p: 2,
        flexShrink: 0,          // Evita que se encoja en un contenedor flex
      }}
    >
      <Stepper 
        activeStep={currentStep - 1} 
        orientation="vertical"
        sx={{
          '& .MuiStepLabel-root': {
            py: 1,
          }
        }}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
};

export default ProgressSteps;
