import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Divider,
} from '@mui/material';
import { SendAndArchive } from '@mui/icons-material';
import { FormLayout } from '../../layout/FormLayout';
import { useFormNavigation } from '../../features/licencia/hooks/useFormNavigation';
import { FormNavigation } from '../../features/licencia/components/navigation/FormNavigation';
import { useAuthStorage } from '../../storage/authStorage';
import { FormSend } from '../../features/licencia/components/navigation/FormSend';

export const ResumenPage = () => {
  const { currentStepIndex } = useFormNavigation();
  const tipoContribuyente = useAuthStorage(state => state.tipoContribuyente) || 'juridica';

  // Estado para los datos resumidos del formulario
  const [formData] = useState({
    modalidad: 'ITSE Posterior',
    ruc: '20531416024',
    nombreSolicitante: 'Empresa ABC S.A.C.',
    dniCE: '12345678',
    correo: 'contacto@empresaabc.com',
    direccionSolicitante: 'Av. Principal 123, Nuevo Chimbote',
    representanteNombre: 'Juan Pérez García',
    representanteDni: '45678912',
    representantePartida: 'PE-12345678',
    nombreComercial: 'Comercial ABC',
    codigoCIIU: '4711',
    giro: 'Tienda',
    actividad: 'Venta de productos alimenticios',
    direccionEstablecimiento: 'Jr. Las Flores 456, Nuevo Chimbote',
    direccionMapa: 'Jr. Las Flores 456, Nuevo Chimbote',
    areaSolicitada: '120',
    declaraciones: 'Todas las declaraciones han sido aceptadas',
  });

  const handleSubmit = () => {
    // Lógica para enviar el formulario completo
    alert('Formulario enviado correctamente');
  };

  return (
    <FormLayout
      headerTitle='Trámite de Licencia'
      contentTitle='Resumen Final del Formulario'
      contentSubtitle='Verifique la información antes de enviar'
      showSteps={false}>
      <Box sx={styles.formContainer}>
        <Box sx={styles.scrollArea}>
          <Grid container spacing={1}>
            {/* Sección Modalidad */}
            <Grid item xs={12}>
              <Box sx={styles.sectionContainer}>
                <Typography variant='subtitle1' sx={styles.sectionTitle}>
                  Modalidad
                </Typography>
                <TextField
                  fullWidth
                  value={formData.modalidad}
                  disabled
                  placeholder="Tipo de licencia seleccionada"
                  variant="outlined"
                  size="small"
                  sx={styles.textField}
                />
              </Box>
            </Grid>

            {/* Datos del Solicitante */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={styles.sectionContainer}>
                <Typography variant='subtitle1' sx={styles.sectionTitle}>
                  Datos del Solicitante
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Número RUC"
                      value={formData.ruc}
                      disabled
                      variant="outlined"
                      size="small"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      value={formData.nombreSolicitante}
                      disabled
                      variant="outlined"
                      size="small"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Número DNI/CE"
                      value={formData.dniCE}
                      disabled
                      variant="outlined"
                      size="small"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Correo Electrónico"
                      value={formData.correo}
                      disabled
                      variant="outlined"
                      size="small"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Dirección"
                      value={formData.direccionSolicitante}
                      disabled
                      variant="outlined"
                      size="small"
                      sx={styles.textField}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Representante Legal - Solo para persona jurídica */}
            {tipoContribuyente === 'juridica' && (
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box sx={styles.sectionContainer}>
                  <Typography variant='subtitle1' sx={styles.sectionTitle}>
                    Representante Legal
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Apellidos y Nombres"
                        value={formData.representanteNombre}
                        disabled
                        variant="outlined"
                        size="small"
                        sx={styles.textField}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Número DNI/CE"
                        value={formData.representanteDni}
                        disabled
                        variant="outlined"
                        size="small"
                        sx={styles.textField}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Número de partida electrónica"
                        value={formData.representantePartida}
                        disabled
                        variant="outlined"
                        size="small"
                        sx={styles.textField}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            )}

            {/* Datos del Establecimiento */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={styles.sectionContainer}>
                <Typography variant='subtitle1' sx={styles.sectionTitle}>
                  Datos del Establecimiento
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nombre Comercial"
                      value={formData.nombreComercial}
                      disabled
                      variant="outlined"
                      size="small"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Código CIIU"
                      value={formData.codigoCIIU}
                      disabled
                      variant="outlined"
                      size="small"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Giro"
                      value={formData.giro}
                      disabled
                      variant="outlined"
                      size="small"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Actividad"
                      value={formData.actividad}
                      disabled
                      variant="outlined"
                      size="small"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Dirección Establecimiento"
                      value={formData.direccionEstablecimiento}
                      disabled
                      variant="outlined"
                      size="small"
                      sx={styles.textField}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Ubicación del establecimiento */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={styles.sectionContainer}>
                <Typography variant='subtitle1' sx={styles.sectionTitle}>
                  Ubicación del Establecimiento
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Dirección (Mapa)"
                      value={formData.direccionMapa}
                      disabled
                      variant="outlined"
                      size="small"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Área total solicitada (m²)"
                      value={formData.areaSolicitada}
                      disabled
                      variant="outlined"
                      size="small"
                      sx={styles.textField}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Declaraciones Juradas */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={styles.sectionContainer}>
                <Typography variant='subtitle1' sx={styles.sectionTitle}>
                  Declaraciones Juradas
                </Typography>
                <TextField
                  fullWidth
                  label="Declaraciones"
                  value={formData.declaraciones}
                  disabled
                  variant="outlined"
                  size="small"
                  multiline
                  rows={2}
                  sx={styles.textField}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={styles.navigationWrapper}>
          <FormSend currentStepIndex={currentStepIndex} handleSubmit={handleSubmit}/>
        </Box>
      </Box>
    </FormLayout>
  );
};

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  scrollArea: {
    flex: 1,
    overflowY: 'auto',
    p: 1,
  },
  navigationWrapper: {
    mt: 'auto',
    borderTop: '1px solid #e2e8f0',
    pt: 2,
    pb: 1,
    px: 1,
    backgroundColor: 'white',
  },
  sectionContainer: {
    mb: 1,
    '&:last-child': {
      mb: 0
    }
  },
  sectionTitle: {
    color: '#2c3e50',
    fontWeight: 600,
    mb: 1,
    fontSize: '1.1rem',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: '#f8fafc',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#90cdf4',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3182ce',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#4a5568'
    }
  },
};

export default ResumenPage;