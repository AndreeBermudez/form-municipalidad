import { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  InputAdornment,
} from '@mui/material';
import { FormLayout } from '../../layout/FormLayout';
import { useFormNavigation } from '../../features/licencia/hooks/useFormNavigation';
import { FormNavigation } from '../../features/licencia/components/navigation/FormNavigation';
import { useFormStorage } from '../../storage/formStorage';
import { validateActivityNoNumbers } from '../../features/licencia/components/utils/validations';

export const EstablecimientoPage = () => {
  const { currentStepIndex } = useFormNavigation();
  const updateEstablecimientoData = useFormStorage((state) => state.updateEstablecimientoData);
  const establecimientoData = useFormStorage((state) => state.establecimientoData);

  const [formData, setFormData] = useState({
    nombreComercial: '',
    codigoCiiu: '',
    giro: '',
    giroId: '',
    actividad: '',
    zonificacion: '',
    tipoDireccionNum: '',
    direccionNum: '',
    tipoDireccion: '',
    direccionNombre: '',
    tipoUrbanizacion: '',
    urbanizacionNombre: '',
    provincia: '',
    ...establecimientoData,
  });

  const [actividadError, setActividadError] = useState('');
  const [giros, setGiros] = useState([]);

  // 1. Al montar el componente, obtenemos la zonificación si el ciudadano tiene un código asociado
  useEffect(() => {
    const ciudadanoId = localStorage.getItem('ciudadanoId');
    if (ciudadanoId) {
      fetchZonificacion(ciudadanoId);
    }
  }, []);

  // 2. Función para obtener la zonificación desde tu API (primer endpoint)
  const fetchZonificacion = async (idCiudadano) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/public/search/cod/${idCiudadano}`);
      if (!response.ok) {
        throw new Error('Error al obtener la zonificación');
      }
      const result = await response.json();
      console.log('Resultado zonificación:', result);

      // Supongamos que en data[0].numeroCodigo está el código que necesitamos
      const zon = result.data?.[0]?.numeroCodigo || '';
      if (zon) {
        // Actualizamos el formulario y el store
        setFormData((prev) => ({ ...prev, zonificacion: zon }));
        updateEstablecimientoData({ zonificacion: zon });

        // Llamamos al segundo endpoint para ver todo el JSON relacionado
        fetchInfoByCodigo(zon);
      }
    } catch (error) {
      console.error('Error fetchZonificacion:', error);
    }
  };

  // 3. Función para obtener todo el JSON con el código de zonificación (segundo endpoint)
  const fetchInfoByCodigo = async (codigo) => {
    try {
      // Endpoint: http://localhost:8080/api/v1/public/search/{codigo}
      const response = await fetch(`http://localhost:8080/api/v1/public/search/${codigo}`);
      if (!response.ok) {
        throw new Error('Error al obtener la información completa de la zonificación');
      }
      const result = await response.json();
      console.log('JSON completo de la zonificación:', result);
      // Si deseas, puedes guardar más datos en tu store o setear más campos en formData
    } catch (error) {
      console.error('Error en fetchInfoByCodigo:', error);
    }
  };

  // 4. useEffect para obtener la lista de giros y llenar el combo
  useEffect(() => {
    const fetchGiros = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/authentication/listar/todos/losgiros');
        if (!response.ok) {
          throw new Error('Error al obtener los giros');
        }
        const result = await response.json();
        const { data } = result;
        if (Array.isArray(data)) {
          setGiros(data);
        } else {
          console.error('La propiedad data no es un array:', data);
          setGiros([]);
        }
      } catch (error) {
        console.error('Error fetching giros:', error);
        setGiros([]);
      }
    };
    fetchGiros();
  }, []);

  // Función para limitar caracteres (letras, números y espacios)
  const handleKeyPressLettersNumbers = (event) => {
    const regex = /^[A-Za-z0-9\s]$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };

  // Manejador genérico para cambios en el formulario
  const handleChange = (field) => (event) => {
    const newValue = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: newValue }));
    updateEstablecimientoData({ [field]: newValue });

    if (field === 'actividad') {
      const errorMsg = validateActivityNoNumbers(newValue);
      setActividadError(errorMsg);
    }
  };

  // Manejador para el cambio en el combo de giros
  const handleGiroChange = (event) => {
    const selectedGiroId = parseInt(event.target.value, 10);
    const giroObj = giros.find((g) => g.giroId === selectedGiroId);

    setFormData((prev) => ({
      ...prev,
      giro: giroObj ? giroObj.nombre : '',
      codigoCiiu: giroObj ? giroObj.codigoCiiu : '',
      giroId: giroObj ? giroObj.giroId : '',
    }));

    updateEstablecimientoData({
      giro: giroObj ? giroObj.nombre : '',
      codigoCiiu: giroObj ? giroObj.codigoCiiu : '',
      giroId: giroObj ? giroObj.giroId : '',
    });

    if (giroObj) {
      localStorage.setItem('giroId', giroObj.giroId);
      localStorage.setItem('codigoCiiu', giroObj.codigoCiiu);
    } else {
      localStorage.removeItem('giroId');
      localStorage.removeItem('codigoCiiu');
    }
  };

  const requiredFields = [
    'nombreComercial',
    'codigoCiiu',
    'giro',
    'actividad',
    'direccionNombre',
    'direccionNum',
    'provincia',
  ];

  const isValid =
    requiredFields.every((field) => formData[field]?.toString().trim() !== '') &&
    actividadError === '';

  return (
    <FormLayout
      headerTitle='Trámite de Licencia'
      contentTitle='Datos del Establecimiento'
      contentSubtitle='Complete los datos del establecimiento comercial'
    >
      <Box sx={styles.formContainer}>
        <Box sx={styles.scrollArea}>
          <Grid container spacing={1}>
            {/* Información del Establecimiento */}
            <Grid item xs={12}>
              <Box sx={styles.sectionContainer}>
                <Typography variant='subtitle1' sx={styles.sectionTitle}>
                  Información del Establecimiento
                </Typography>
                <Grid container spacing={2}>
                  {/* Nombre Comercial */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Nombre Comercial'
                      variant='outlined'
                      size='small'
                      placeholder='Ingrese el nombre comercial'
                      value={formData.nombreComercial}
                      onChange={handleChange('nombreComercial')}
                      sx={styles.textField}
                    />
                  </Grid>

                  {/* Combo de Giros */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant='outlined' size='small' sx={styles.textField}>
                      <InputLabel>Giros</InputLabel>
                      <Select label='Giros' value={formData.giroId || ''} onChange={handleGiroChange}>
                        <MenuItem value=''>
                          <em>Seleccione el giro correspondiente</em>
                        </MenuItem>
                        {giros.map((giroItem) => (
                          <MenuItem key={giroItem.giroId} value={giroItem.giroId}>
                            {giroItem.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Código CIIU (deshabilitado) */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Código CIIU'
                      variant='outlined'
                      size='small'
                      placeholder='Código CIIU'
                      value={formData.codigoCiiu}
                      disabled
                      sx={styles.textField}
                    />
                  </Grid>

                  {/* Actividad */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Actividad'
                      variant='outlined'
                      size='small'
                      placeholder='Ej: venta de broster, alitas'
                      value={formData.actividad}
                      onChange={handleChange('actividad')}
                      sx={styles.textField}
                      error={Boolean(actividadError)}
                      helperText={actividadError}
                    />
                  </Grid>

                  {/* Zonificación (rellenado automático si existe) */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Zonificación'
                      variant='outlined'
                      size='small'
                      placeholder='(Llenado automático)'
                      disabled
                      value={formData.zonificacion}
                      onChange={handleChange('zonificacion')}
                      sx={styles.textField}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Sección de Dirección */}
            <Grid item xs={12}>
              <Box sx={styles.sectionContainer}>
                <Typography variant='subtitle1' sx={styles.sectionTitle}>
                  Dirección
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Av. / Jr. / Ca. / Pje. / Otros'
                      placeholder='Nombre de la vía'
                      variant='outlined'
                      size='small'
                      value={formData.direccionNombre}
                      onChange={handleChange('direccionNombre')}
                      sx={styles.textField}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Select
                              variant='standard'
                              value={formData.tipoDireccion || ''}
                              onChange={handleChange('tipoDireccion')}
                              sx={styles.documentTypeSelect}
                              defaultValue=''
                              size='small'
                            >
                              <MenuItem value=''>↓</MenuItem>
                              <MenuItem value='Av.'>Av.</MenuItem>
                              <MenuItem value='Jr.'>Jr.</MenuItem>
                              <MenuItem value='Ca.'>Ca.</MenuItem>
                              <MenuItem value='Pje.'>Pje.</MenuItem>
                              <MenuItem value='Otros'>Otros</MenuItem>
                            </Select>
                          </InputAdornment>
                        ),
                        onKeyPress: handleKeyPressLettersNumbers,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Urb. / AAHH. / Otros'
                      placeholder='Nombre de urbanización o asentamiento'
                      variant='outlined'
                      size='small'
                      value={formData.urbanizacionNombre}
                      onChange={handleChange('urbanizacionNombre')}
                      sx={styles.textField}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Select
                              variant='standard'
                              value={formData.tipoUrbanizacion || ''}
                              onChange={handleChange('tipoUrbanizacion')}
                              sx={styles.documentTypeSelect}
                              defaultValue=''
                              size='small'
                            >
                              <MenuItem value=''>↓</MenuItem>
                              <MenuItem value='Urb.'>Urb.</MenuItem>
                              <MenuItem value='AAHH.'>AAHH.</MenuItem>
                              <MenuItem value='Otro.'>Otro.</MenuItem>
                            </Select>
                          </InputAdornment>
                        ),
                        onKeyPress: handleKeyPressLettersNumbers,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='N° Int. / Mz. / Otros'
                      placeholder='Número o identificación'
                      variant='outlined'
                      size='small'
                      value={formData.direccionNum}
                      onChange={handleChange('direccionNum')}
                      sx={styles.textField}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Select
                              variant='standard'
                              value={formData.tipoDireccionNum || ''}
                              onChange={handleChange('tipoDireccionNum')}
                              sx={styles.documentTypeSelect}
                              defaultValue=''
                              size='small'
                            >
                              <MenuItem value=''>↓</MenuItem>
                              <MenuItem value='N° Int.'>N° Int.</MenuItem>
                              <MenuItem value='Mz Lt'>Mz Lt</MenuItem>
                              <MenuItem value='Otros'>Otros</MenuItem>
                            </Select>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant='outlined' sx={styles.textField} size='small'>
                      <InputLabel>Provincia</InputLabel>
                      <Select
                        label='Provincia'
                        value={formData.provincia}
                        onChange={handleChange('provincia')}
                      >
                        <MenuItem value=''>Seleccione una provincia</MenuItem>
                        <MenuItem value='Santa'>Santa</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Navegación del formulario */}
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
    overflowY: 'auto',
  },
  scrollArea: {
    overflowY: 'auto',
  },
  sectionContainer: {
    mb: 1,
    '&:last-child': {
      mb: 0,
    },
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
    '& .MuiInputLabel-root': {
      color: '#4a5568',
    },
  },
  documentTypeSelect: {
    '& .MuiSelect-select': {
      border: 'none',
      minWidth: '30px',
      padding: '2px',
    },
    '&:before, &:after': {
      display: 'none',
    },
  },
  navigationWrapper: {
    marginTop: 'auto',
    paddingTop: 4,
  },
};

export default EstablecimientoPage;
