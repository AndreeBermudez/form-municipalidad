import React from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, Divider } from '@mui/material';
import { ArrowBack, Send } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';

const FormularioResumen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Se extrae el tipo de persona; si no se especifica, se asume "juridica"
  const personType = location.state?.personType || 'juridica';

  const [formData] = React.useState({
    modalidad: '',
    ruc: '',
    nombreSolicitante: '',
    dniCE: '',
    correo: '',
    direccionSolicitante: '',
    representanteNombre: '',
    representanteDni: '',
    representantePartida: '',
    nombreComercial: '',
    codigoCIIU: '',
    giro: '',
    actividad: '',
    direccionEstablecimiento: '',
    direccionMapa: '',
    areaSolicitada: '',
    declaraciones: '',
  });

  // Handler placeholder (si en el futuro se permite editar)
  const handleChange = (field) => (event) => {
    // Lógica para actualizar el estado en caso de habilitar la edición.
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Header title="Trámite de Licencia" />
      
      {/* Contenedor central */}
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
        <Paper sx={{ width: '100%', maxWidth: 800, p: 4, borderRadius: 2, boxShadow: 3, bgcolor: 'white' }}>
          <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold', color: 'black' }}>
            Resumen Final del Formulario
          </Typography>

          {/* Sección Modalidad */}
          <Typography variant="h6" sx={{ mb: 1, color: "text.secondary" }}>
            Modalidad
          </Typography>
          <TextField
            fullWidth
            value={formData.modalidad}
            disabled
            placeholder="Tipo de licencia seleccionada"
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Divider sx={{ my: 3 }} />

          {/* Datos del Solicitante */}
          <Typography variant="h6" sx={{ mb: 1, color: "text.secondary" }}>
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                value={formData.nombreSolicitante}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Número DNI/CE"
                value={formData.dniCE}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                value={formData.correo}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dirección"
                value={formData.direccionSolicitante}
                disabled
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Representante Legal - Solo para persona jurídica */}
          {personType === 'juridica' && (
            <>
              <Typography variant="h6" sx={{ mb: 1, color: "text.secondary" }}>
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Número DNI/CE"
                    value={formData.representanteDni}
                    disabled
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Número de partida electrónica"
                    value={formData.representantePartida}
                    disabled
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Divider sx={{ my: 3 }} />
            </>
          )}

          {/* Datos del Establecimiento */}
          <Typography variant="h6" sx={{ mb: 1, color: "text.secondary" }}>
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Código CIIU"
                value={formData.codigoCIIU}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Giro"
                value={formData.giro}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Actividad"
                value={formData.actividad}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dirección Establecimiento"
                value={formData.direccionEstablecimiento}
                disabled
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Ubicación del establecimiento */}
          <Typography variant="h6" sx={{ mb: 1, color: "text.secondary" }}>
            Ubicación del Establecimiento
          </Typography>
          <TextField
            fullWidth
            label="Dirección (Mapa)"
            value={formData.direccionMapa}
            disabled
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Área total solicitada (m²)"
            value={formData.areaSolicitada}
            disabled
            variant="outlined"
            sx={{ mt: 2 }}
          />

          <Divider sx={{ my: 3 }} />

          {/* Declaraciones Juradas */}
          <Typography variant="h6" sx={{ mb: 1, color: 'black' }}>
            Declaraciones Juradas
          </Typography>
          <TextField
            fullWidth
            label="Declaraciones"
            value={formData.declaraciones}
            disabled
            variant="outlined"
            multiline
            rows={3}
          />

          <Divider sx={{ my: 3 }} />

          {/* Botones de navegación */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
              Volver
            </Button>
            <Button variant="contained" endIcon={<Send />} color="primary">
              Enviar Formulario
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default FormularioResumen;
