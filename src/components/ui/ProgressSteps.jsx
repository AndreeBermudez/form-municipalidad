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
      <Box sx={{
        width: '100%',
        textAlign: 'center',
        mb: 2
      }}>
        <Typography variant="h6" sx={{
          fontWeight: 'bold',
          color: 'primary.main'
        }}>
          {steps[currentStep - 1]}
        </Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{
      p: 2,
      height: '100%',
      boxShadow: 3,
    }}>
      <Stepper activeStep={currentStep - 1} orientation="vertical" sx={{
        '& .MuiStepLabel-root': {
          py: 1,
        }
      }}>
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
