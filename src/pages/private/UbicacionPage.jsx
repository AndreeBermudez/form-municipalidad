import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LocationMarker } from '../../features/licencia/components/map/LocationMarker';
import { FormNavigation } from '../../features/licencia/components/navigation/FormNavigation';
import { useFormNavigation } from '../../features/licencia/hooks/useFormNavigation';
import { FormLayout } from '../../layout/FormLayout';
import { useFormStorage } from '../../storage/formStorage';
import UbicacionModal from '../../features/licencia/components/modality/UbicacionModal';
import { validateArea } from '../../features/licencia/components/utils/validations';

export const UbicacionPage = () => {
  const { currentStepIndex } = useFormNavigation();
  const updateUbicacionData = useFormStorage((state) => state.updateUbicacionData);
  const ubicacionData = useFormStorage((state) => state.ubicacionData);

  const ubicationSelected = [ubicacionData.lat || -9.085594, ubicacionData.lng || -78.578593];
  const [position, setPosition] = useState(ubicationSelected);

  const [formData, setFormData] = useState({
    lat: '',
    lng: '',
    area: 1,
    ...ubicacionData,
  });

  // Estado para controlar la apertura del modal informativo
  const [openModal, setOpenModal] = useState(true);

  const handleChange = (field) => (event) => {
    const newValue = event.target.value;
    setFormData({
      ...formData,
      [field]: newValue,
    });
    updateUbicacionData({ [field]: newValue });
  };

  const handlePosition = (coordenadas) => {
    setPosition(coordenadas);
    const { lat, lng } = coordenadas;
    setFormData({ ...formData, lat, lng });
    updateUbicacionData({ ...formData, lat, lng });
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Valida que lat, lng tengan valores y que el área sea válida usando validateArea
  const isValid =
    formData.lat !== '' &&
    formData.lng !== '' &&
    validateArea(formData.area) === "";

  return (
    <FormLayout
      headerTitle="Trámite de Licencia"
      contentTitle="Croquis de la ubicación"
      contentSubtitle="Selecciona la ubicación del establecimiento"
    >
      {/* Se llama al componente modal */}
      <UbicacionModal open={openModal} onClose={handleCloseModal} />

      <Box sx={styles.formContainer}>
        <Box sx={styles.scrollArea}>
          <Grid container spacing={1}>
            {/* Mapa */}
            <Grid item xs={12}>
              <Box sx={styles.sectionContainer}>
                <MapContainer center={position} zoom={15} style={styles.mapContainer} scrollWheelZoom={false}>
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker position={position} handlePosition={handlePosition} />
                </MapContainer>
              </Box>
            </Grid>

            {/* Área total */}
            <Grid item xs={12}>
              <Box sx={styles.sectionContainer}>
                <Typography variant="subtitle1" sx={styles.sectionTitle}>
                  Área total solicitada (m²)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Ingrese el área total en m²"
                  variant="outlined"
                  size="small"
                  value={formData.area}
                  onChange={handleChange('area')}
                  // Se utiliza la validación para mostrar error y helperText
                  error={!!validateArea(formData.area)}
                  helperText={validateArea(formData.area)}
                  sx={styles.textField}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={styles.navigationWrapper}>
          <FormNavigation currentStepIndex={currentStepIndex} isValid={isValid} />
        </Box>
      </Box>
    </FormLayout>
  );
};

const styles = {
  formContainer: {
    p: 1,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  sectionContainer: {
    mb: 3,
    '&:last-child': {
      mb: 0,
    },
  },
  mapContainer: {
    width: '100%',
    height: '280px',
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
      backgroundColor: '#fff',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#90cdf4',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3182ce',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#4a5568',
    },
  },
  navigationWrapper: {
    marginTop: 'auto',
    paddingTop: 4,
  },
};

export default UbicacionPage;
