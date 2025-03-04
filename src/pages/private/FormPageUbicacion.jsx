import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MobileStepper
} from '@mui/material';
import Header from '../../components/ui/Header';
import ProgressSteps from '../../components/ui/ProgressSteps';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';

const FormPageUbicacion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Extraer el tipo de persona; se asume "juridica" por defecto
  const personType = location.state?.personType || 'juridica';

  // Definir los pasos condicionalmente:
  // - Para "juridica": se incluyen 6 pasos (con "Representante")
  // - Para "natural": se usan 5 pasos (se omite "Representante")
  const steps = personType === 'juridica'
    ? ['Modalidad', 'Solicitante', 'Representante', 'Establecimiento', 'Ubicación', 'Declaración']
    : ['Modalidad', 'Solicitante', 'Establecimiento', 'Ubicación', 'Declaración'];
  // El currentStep para esta página:
  // - Si es jurídica, Ubicación es el paso 5.
  // - Si es natural, es el paso 4.
  const currentStep = personType === 'juridica' ? 5 : 4;

  const [address, setAddress] = useState('');
  const position = [-9.085594, -78.578593];

  const handleBack = () => {
    navigate('/formulario/pag-establecimiento', { state: { personType } });
  };

  const handleNext = () => {
    navigate('/formulario/pag-declaracion', { state: { personType } });
  };

  return (
    <Box sx={styles.root}>
      <Header title='Trámite de Licencia' />
      <Box sx={styles.mainContainer}>
        <Grid container spacing={4} justifyContent="center">
          {/* ProgressSteps vertical solo en desktop */}
          <Grid item xs={12} md={2.5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={styles.stepperContainer}>
              <ProgressSteps 
                steps={steps} 
                currentStep={currentStep}
                onBack={handleBack}
                onNext={handleNext}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Paper sx={styles.paper}>
              <Typography variant="h5" sx={styles.title}>
                Croquis de la ubicación
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={styles.subtitle}>
                Selecciona la ubicación del establecimiento
              </Typography>

              {/* Mapa */}
              <MapContainer 
                center={position} 
                zoom={15} 
                style={styles.mapContainer}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>

              {/* Dirección seleccionada (oculto por ahora) */}
              <Box sx={{ display: 'none', mt: 4 }}>
                <Typography variant="subtitle1" sx={styles.label}>
                  📍 Dirección Seleccionada
                </Typography>
                <TextField
                  fullWidth
                  value={address}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                />
              </Box>

              {/* Área total solicitada */}
              <Box sx={styles.areaContainer}>
                <Typography variant="subtitle1" sx={styles.label}>
                  Área total solicitada (m²)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Ingrese el área total en m²"
                  variant="outlined"
                />
              </Box>

              {/* Navegación */}
              <Box sx={styles.navigationContainer}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                >
                  Anterior
                </Button>

                {/* Mostrar MobileStepper solo en móvil */}
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  <MobileStepper
                    variant="dots"
                    steps={steps.length}
                    position="static"
                    activeStep={currentStep - 1}
                    sx={{
                      backgroundColor: 'transparent',
                      width: 'auto',
                      px: 2,
                      '& .MuiMobileStepper-dots': {
                        mt: 0
                      }
                    }}
                    backButton={null}
                    nextButton={null}
                  />
                </Box>

                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForward />}
                >
                  Siguiente
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const styles = {
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'grey.100'
  },
  mainContainer: {
    flex: 1,
    p: 3,
    display: 'flex',
    flexDirection: 'column'
  },
  progressContainer: {
    px: { xs: 3, sm: 5 },
    py: 2,
    pb: 3
  },
  stepperContainer: {
    height: '100%',
    '& > *': {
      height: '100%'
    }
  },
  paper: {
    width: '100%',
    borderRadius: 2,
    overflow: 'hidden',
    boxShadow: 3,
    p: 2,
    height: '100%'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    mb: 1
  },
  subtitle: {
    textAlign: 'center',
    mb: 4
  },
  mapContainer: {
    width: '100%',
    height: '280px',
  },
  label: {
    color: 'text.primary',
    fontWeight: 500,
    mb: 1
  },
  areaContainer: {
    mt: 2
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: 3,
    pt: 2,
    borderTop: '1px solid',
    borderColor: 'divider',
    '& .MuiButton-root': {
      minWidth: { xs: '100px', md: '120px' }
    },
    '& .MuiMobileStepper-dots': {
      '& .MuiMobileStepper-dot': {
        mx: 0.5,
        backgroundColor: 'grey.400'
      },
      '& .MuiMobileStepper-dotActive': {
        backgroundColor: 'primary.main'
      }
    }
  }
};

export default FormPageUbicacion;
