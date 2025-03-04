import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	Box,
	Button,
	Grid,
	Paper,
	TextField,
	Typography,
	InputAdornment,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	MobileStepper,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Header from '../../components/ui/Header';
import ProgressSteps from '../../components/ui/ProgressSteps';

const FormPageEstablecimiento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Extraemos el tipo de persona; se asume "juridica" si no se envía
  const personType = location.state?.personType || 'juridica';

  // Definir los pasos condicionalmente:
  // Para "juridica" se incluye el paso "Representante" (6 pasos)
  // Para "natural" se omite (5 pasos)
  const steps = personType === 'juridica'
    ? ['Modalidad', 'Solicitante', 'Representante', 'Establecimiento', 'Ubicación', 'Declaración']
    : ['Modalidad', 'Solicitante', 'Establecimiento', 'Ubicación', 'Declaración'];
  // currentStep: para "juridica" la página de establecimiento es el paso 4; para "natural" es el 3.
  const currentStep = personType === 'juridica' ? 4 : 3;

  // Navegación del botón "Anterior"
  const handleBack = () => {
    if (personType === 'juridica') {
      navigate('/formulario/pag-representante', { state: { personType } });
    } else {
      navigate('/formulario/pag-inder', { state: { personType } });
    }
  };

  const handleNext = () => navigate('/formulario/pag-ubicacion', { state: { personType } });

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

          {/* Contenido principal */}
          <Grid item xs={12} md={7}>
            <Paper sx={styles.paper}>
              <Box sx={styles.contentHeader}>
                <Typography variant="h5" sx={styles.title}>
                  Datos del Establecimiento
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={styles.subtitle}>
                  Complete los datos del establecimiento comercial
                </Typography>
              </Box>

              <Box sx={styles.formContainer}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Box sx={styles.sectionContainer}>
                      <Typography variant="subtitle1" sx={styles.sectionTitle}>
                        Información del Establecimiento
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Nombre Comercial"
                            variant="outlined"
                            size="small"
                            placeholder="Ingrese el nombre comercial"
                            sx={styles.textField}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Código CIIU"
                            variant="outlined"
                            size="small"
                            placeholder="Ingrese el código CIIU"
                            sx={styles.textField}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Giros</InputLabel>
                            <Select label="Giros" defaultValue="">
                              <MenuItem value="">
                                Seleccione el giro correspondiente
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Actividad"
                            variant="outlined"
                            size="small"
                            placeholder="Ingrese su actividad"
                            sx={styles.textField}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Zonificación"
                            variant="outlined"
                            size="small"
                            placeholder="(Llenado automático)"
                            disabled
                            sx={styles.textField}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={styles.sectionContainer}>
                      <Typography variant="subtitle1" sx={styles.sectionTitle}>
                        Dirección
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Av. / Jr. / Ca. / Pje. / Otros"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Select
                                    variant="standard"
                                    defaultValue=""
                                    sx={styles.addressTypeSelect}
                                  >
                                    <MenuItem value="">↓</MenuItem>
                                    <MenuItem value="Av.">Av.</MenuItem>
                                    <MenuItem value="Jr.">Jr.</MenuItem>
                                    <MenuItem value="Ca.">Ca.</MenuItem>
                                    <MenuItem value="Pje.">Pje.</MenuItem>
                                    <MenuItem value="Otros">Otros</MenuItem>
                                  </Select>
                                </InputAdornment>
                              ),
                            }}
                            sx={styles.textField}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="N° Int./Mz./Lt./Otros"
                            variant="outlined"
                            size="small"
                            placeholder="Ingrese el número"
                            sx={styles.textField}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Urb. / AAHH. / Otros"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Select
                                    variant="standard"
                                    defaultValue=""
                                    sx={styles.addressTypeSelect}
                                  >
                                    <MenuItem value="">↓</MenuItem>
                                    <MenuItem value="Urb.">Urb.</MenuItem>
                                    <MenuItem value="AAHH.">AAHH.</MenuItem>
                                    <MenuItem value="Otro.">Otro.</MenuItem>
                                  </Select>
                                </InputAdornment>
                              ),
                            }}
                            sx={styles.textField}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

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
                  Continuar
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
    bgcolor: 'grey.100',
  },
  mainContainer: {
    flex: 1,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  stepperContainer: {
    height: '100%',
    '& > *': {
      height: '100%',
    },
  },
  paper: {
    width: '100%',
    borderRadius: 2,
    overflow: 'hidden',
    boxShadow: 3,
    p: 2,
    height: '100%',
    backgroundColor: 'white',
  },
  contentHeader: {
    textAlign: 'center',
    mb: 3,
  },
  title: {
    textAlign: 'center',
    fontWeight: 600,
    color: '#1e293b',
  },
  subtitle: {
    textAlign: 'center',
    mt: 1,
    color: 'text.secondary',
  },
  formContainer: {
    mt: 2,
  },
  sectionContainer: {
    mb: 3,
  },
  sectionTitle: {
    fontWeight: 600,
    color: '#475569',
    mb: 2,
  },
  textField: {
    backgroundColor: '#f8fafc',
  },
  addressTypeSelect: {
    minWidth: '60px',
    '& .MuiSelect-select': {
      py: 0,
    },
  },
  navigationContainer: {
    mt: 4,
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export default FormPageEstablecimiento;
