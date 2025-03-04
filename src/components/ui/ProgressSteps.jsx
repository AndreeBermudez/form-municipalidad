import React from 'react';
import { Stepper, Step, StepLabel, Box, Paper, Typography, useTheme, useMediaQuery } from '@mui/material';

const ProgressSteps = ({ steps, currentStep }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <Paper
        sx={{
          width: '280px',
          height: '300px',
          overflowY: 'auto',
          boxShadow: 3,
          p: 2,
          flexShrink: 0,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}>
          {steps[currentStep - 1]}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        width: '300px',
        height: '600px',
        overflowY: 'auto',
        boxShadow: 3,
        p: 2,
        flexShrink: 0,
      }}
    >
      <Stepper activeStep={currentStep - 1} orientation="vertical" sx={{ '& .MuiStepLabel-root': { py: 1 } }}>
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
