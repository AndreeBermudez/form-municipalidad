import { Box, Button, MobileStepper } from '@mui/material';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import { useAuthStorage } from '../../../../storage/authStorage';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

export const FormNavigation = ({ currentStepIndex, isValid }) => {
  const { goToNext, goToPrevious } = useFormNavigation();
  const tipoContribuyente = useAuthStorage((state) => state.tipoContribuyente) || 'juridica';

  const steps =
    tipoContribuyente === 'juridica'
      ? ['Modalidad', 'Solicitante', 'Representante', 'Establecimiento', 'Ubicación', 'Declaración', 'Resumen']
      : ['Modalidad', 'Solicitante', 'Establecimiento', 'Ubicación', 'Declaración', 'Resumen'];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mt: 'auto',
        pt: 3,
      }}
    >
      <Button variant="outlined" onClick={goToPrevious} startIcon={<ArrowBack />}>
        Anterior
      </Button>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <MobileStepper
          variant="dots"
          steps={steps.length}
          position="static"
          activeStep={currentStepIndex}
          sx={{
            backgroundColor: 'transparent',
            width: 'auto',
            px: 2,
            '& .MuiMobileStepper-dots': {
              mt: 0,
            },
          }}
          backButton={null}
          nextButton={null}
        />
      </Box>
      <Button
        variant="contained"
        onClick={goToNext}
        endIcon={<ArrowForward />}
        disabled={!isValid} 
      >
        Continuar
      </Button>
    </Box>
  );
};
