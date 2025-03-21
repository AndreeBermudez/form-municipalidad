import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button
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
  const establecimientoData = useFormStorage((state) => state.establecimientoData);
  const ubicacionData = useFormStorage((state) => state.ubicacionData);
  const updateUbicacionData = useFormStorage((state) => state.updateUbicacionData);

  // Estado para el mapa
  const ubicationSelected = [ubicacionData.lat || -9.085594, ubicacionData.lng || -78.578593];
  const [position, setPosition] = useState(ubicationSelected);

  const [formData, setFormData] = useState({
    lat: '',
    lng: '',
    area: 1,
    ...ubicacionData,
  });

  // Estado para guardar el id del negocio creado (idNegocio)
  const [businessId, setBusinessId] = useState(null);

  const [openModal, setOpenModal] = useState(true);

  const handleChange = (field) => (event) => {
    const newValue = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: newValue }));
    updateUbicacionData({ [field]: newValue });
  };

  const handlePosition = (coordenadas) => {
    setPosition(coordenadas);
    const { lat, lng } = coordenadas;
    setFormData((prev) => ({ ...prev, lat, lng }));
    updateUbicacionData({ ...formData, lat, lng });
  };

  const handleCloseModal = () => setOpenModal(false);

  const isValid =
    formData.lat !== '' &&
    formData.lng !== '' &&
    validateArea(formData.area) === '';

  // Función para crear el negocio
  const handleCrearNegocio = async () => {
    try {
      const ciudadanoId = localStorage.getItem('ciudadanoId') || '0';
      const tipoContribuyenteId = localStorage.getItem('tipoContribuyenteId');

      const payload = {
        actividad: establecimientoData.actividad,
        nombre: establecimientoData.nombreComercial,
        zonificacion: establecimientoData.zonificacion,
        giroId: establecimientoData.giroId,
        area: formData.area,
        ciudadanoId: parseInt(ciudadanoId, 10),
        tipoContribuyenteId: tipoContribuyenteId
          ? parseInt(tipoContribuyenteId, 10)
          : undefined,
      };

      console.log('Enviando negocio:', payload);

      const response = await fetch('http://localhost:8080/api/v1/authentication/create/negocio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error al crear el negocio:', errorText);
        throw new Error('No se pudo crear el negocio');
      }

      const result = await response.json();
      console.log('Negocio creado con éxito:', result);

      // Extraemos el id del negocio (idNegocio) desde la propiedad "negocioId"
      const idNegocio = result.data?.negocioId || result.data?.id || result.id || null;
      if (!idNegocio) {
        console.error('No se encontró el id del negocio en la respuesta:', result);
        alert('No se pudo obtener el id del negocio. Verifica la respuesta del servidor.');
        return;
      }
      setBusinessId(idNegocio);
      alert(`Negocio guardado con éxito en la BD con id: ${idNegocio}`);
    } catch (error) {
      console.error('Error al guardar negocio:', error);
      alert('Hubo un error al guardar el negocio');
    }
  };

  // Función para crear la dirección del negocio
  const handleCrearDireccion = async () => {
    try {
      const payloadDireccion = {
        provincia: establecimientoData.provincia,                  // Ej: "huacho"
        avenida: establecimientoData.direccionNombre,                // Ej: "castrol"
        manzana: establecimientoData.direccionNum,                   // Ej: "Mz a lote 15"
        urbanizacion: establecimientoData.urbanizacionNombre,        // Ej: "Los heroes"
        distrito: "Nuevo Chimbote",                      // Ej: "Nuevo"
        coordenadas: `${formData.lat},${formData.lng}`               // Ej: "-11.4336012464076369873369154611909665406,-36.528775551476317643519301"
      };

      console.log('Enviando dirección:', payloadDireccion);
      // Usamos el endpoint exactamente como se pasó:
      // http://localhost:8080/api/v1/authentication/{idNegocio}/direccion
      const url = `http://localhost:8080/api/v1/authentication/${businessId}/direccion`;
      console.log('URL de dirección:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payloadDireccion),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error al guardar dirección:', errorText);
        throw new Error('No se pudo guardar la dirección');
      }

      const result = await response.json();
      console.log('Dirección guardada con éxito:', result);
      alert('Dirección guardada con éxito en la BD');
    } catch (error) {
      console.error('Error al guardar dirección:', error);
      alert('Hubo un error al guardar la dirección');
    }
  };

  return (
    <FormLayout
      headerTitle="Trámite de Licencia"
      contentTitle="Croquis de la ubicación"
      contentSubtitle="Selecciona la ubicación del establecimiento"
    >
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

            {/* Área */}
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
                  error={!!validateArea(formData.area)}
                  helperText={validateArea(formData.area)}
                  sx={styles.textField}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

         <Box sx={styles.navigationWrapper}>
                  <FormNavigation
                    currentStepIndex={currentStepIndex}
                    nextButtonText='Finalizar'
                    isValid={isValid}
                  />
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
  scrollArea: {
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
    },
  },
};

export default UbicacionPage;
