import React, { useState, useEffect } from 'react';
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
  Button, 
} from '@mui/material';
import { FormLayout } from '../../layout/FormLayout';
import { useFormNavigation } from '../../features/licencia/hooks/useFormNavigation';
import { FormNavigation } from '../../features/licencia/components/navigation/FormNavigation';
import { useFormStorage } from '../../storage/formStorage';

import {
  validateDNI,
  validateCE,
  validateName,
  validateRUC,
  validateEmail,
  validateTelefono,
} from '../../features/licencia/components/utils/validations';

import { fetchProvincias, fetchDistritos } from '../../features/licencia/components/data/ApiUbigeo';

export const SolicitantePage = () => {
  const { currentStepIndex } = useFormNavigation();
  const updateSolicitanteData = useFormStorage((state) => state.updateSolicitanteData);
  const solicitanteData = useFormStorage((state) => state.solicitanteData);

  // El tipo de contribuyente; por defecto "natural"
  const [selectedType] = useState(solicitanteData.contributorType || 'natural');

  // Valores base obtenidos, por ejemplo, en el login
  const storedNombre = localStorage.getItem('nombre') || '';
  const storedApellido = localStorage.getItem('apellido') || '';
  const storedDocumentType = localStorage.getItem('documentType') || 'DNI';
  const nombreCompleto = `${storedApellido} ${storedNombre}`.trim();

  // Objeto inicial del formulario
  const initialFormData = {
    ...solicitanteData,
    ruc: solicitanteData.ruc || '',
    nombre: solicitanteData.nombre || nombreCompleto,
    razonSocial: solicitanteData.razonSocial || '',
    documentType: solicitanteData.documentType || storedDocumentType,
    // Si es natural, se carga el dni desde localStorage; si es jurídica, se deja vacío o lo que tenga en solicitanteData
    documentNumber:
      selectedType === 'natural'
        ? solicitanteData.documentNumber || localStorage.getItem('dni') || ''
        : solicitanteData.documentNumber || '',
    email: solicitanteData.email || localStorage.getItem('correo') || '',
    telefono: solicitanteData.telefono || localStorage.getItem('telefono') || '',
    tipoDireccionNum: solicitanteData.tipoDireccionNum || '',
    direccionNum: solicitanteData.direccionNum || '',
    tipoDireccion: solicitanteData.tipoDireccion || '',
    direccionNombre: solicitanteData.direccionNombre || '',
    tipoUrbanizacion: solicitanteData.tipoUrbanizacion || '',
    urbanizacionNombre: solicitanteData.urbanizacionNombre || '',
    distrito: solicitanteData.distrito || '',
    provincia: solicitanteData.provincia || '',
    // Campos que se obtendrán de la consulta RUC
    tipoDocumento: solicitanteData.tipoDocumento || '',
    actividadEconomica: solicitanteData.actividadEconomica || '',
    condicionContribuyente: solicitanteData.condicionContribuyente || '',
    estadoRuc: solicitanteData.estadoRuc || '',
  };

  const [formData, setFormData] = useState(initialFormData);

  // Sincronizar el estado local con el store cuando éste cambie
  useEffect(() => {
    setFormData({
      ...solicitanteData,
      ruc: solicitanteData.ruc || '',
      nombre: solicitanteData.nombre || nombreCompleto,
      razonSocial: solicitanteData.razonSocial || '',
      documentType: solicitanteData.documentType || storedDocumentType,
      documentNumber:
        selectedType === 'natural'
          ? solicitanteData.documentNumber || localStorage.getItem('dni') || ''
          : solicitanteData.documentNumber || '',
      email: solicitanteData.email || localStorage.getItem('correo') || '',
      telefono: solicitanteData.telefono || localStorage.getItem('telefono') || '',
      tipoDireccionNum: solicitanteData.tipoDireccionNum || '',
      direccionNum: solicitanteData.direccionNum || '',
      tipoDireccion: solicitanteData.tipoDireccion || '',
      direccionNombre: solicitanteData.direccionNombre || '',
      tipoUrbanizacion: solicitanteData.tipoUrbanizacion || '',
      urbanizacionNombre: solicitanteData.urbanizacionNombre || '',
      distrito: solicitanteData.distrito || '',
      provincia: solicitanteData.provincia || '',
      tipoDocumento: solicitanteData.tipoDocumento || '',
      actividadEconomica: solicitanteData.actividadEconomica || '',
      condicionContribuyente: solicitanteData.condicionContribuyente || '',
      estadoRuc: solicitanteData.estadoRuc || '',
    });
  }, [solicitanteData, nombreCompleto, storedDocumentType, selectedType]);

  // Estados para provincias/distritos
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [selectedProvincia, setSelectedProvincia] = useState(formData.provincia || '');
  const [selectedDistrito, setSelectedDistrito] = useState(formData.distrito || '');
  const [filteredDistritos, setFilteredDistritos] = useState([]);

  // Estados de errores
  const [dniError, setDniError] = useState("");
  const [nameError, setNameError] = useState("");
  const [rucError, setRucError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");

  useEffect(() => {
    fetchProvincias().then(setProvincias);
    fetchDistritos().then(setDistritos);
  }, []);

  useEffect(() => {
    if (selectedProvincia) {
      const provinciaId = provincias.find(prov => prov.provincia === selectedProvincia)?.id;
      setFilteredDistritos(distritos.filter(distrito => distrito.provincia_id === provinciaId));
    } else {
      setFilteredDistritos([]);
    }
  }, [selectedProvincia, provincias, distritos]);

  const handleChange = (field) => (event) => {
    const newValue = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: newValue }));
    updateSolicitanteData({ [field]: newValue });
  };

  const handleProvinciaChange = (e) => {
    const value = e.target.value;
    setSelectedProvincia(value);
    setFormData((prev) => ({ ...prev, provincia: value, distrito: '' }));
    updateSolicitanteData({ provincia: value, distrito: '' });
    setSelectedDistrito('');
  };

  const handleDistritoChange = (e) => {
    const value = e.target.value;
    setSelectedDistrito(value);
    setFormData((prev) => ({ ...prev, distrito: value }));
    updateSolicitanteData({ distrito: value });
  };

  const handleDocumentNumberChange = (event) => {
    const newValue = event.target.value;
    setFormData((prev) => ({ ...prev, documentNumber: newValue }));
    updateSolicitanteData({ documentNumber: newValue });
    
    let errorMsg = "";
    if (formData.documentType === 'DNI') {
      errorMsg = validateDNI(newValue);
    } else if (formData.documentType === 'CE') {
      errorMsg = validateCE(newValue);
    }
    setDniError(errorMsg);
  };

  const handleNameFieldChange = (event) => {
    const newValue = event.target.value;
    setFormData((prev) => ({ ...prev, nombre: newValue }));
    updateSolicitanteData({ nombre: newValue });
    setNameError(validateName(newValue));
  };

  // Consulta automática a la API de SUNAT al ingresar el RUC
  const handleRucChange = async (event) => {
    const newValue = event.target.value;
    setFormData((prev) => ({ ...prev, ruc: newValue }));
    updateSolicitanteData({ ruc: newValue });
    setRucError(validateRUC(newValue));

    if (newValue.length === 11) {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/authentication/empresa/${newValue}`, {
          method: 'POST',
        });
        if (response.ok) {
          const result = await response.json();
          if (result.data) {
            const empresa = result.data;
            setFormData((prev) => ({
              ...prev,
              razonSocial: empresa.razonSocial,
              tipoDocumento: empresa.tipoDocumento,
              actividadEconomica: empresa.actividadEconomica,
              condicionContribuyente: empresa.condicion,
              estadoRuc: empresa.estado,
            }));
            updateSolicitanteData({
              razonSocial: empresa.razonSocial,
              tipoDocumento: empresa.tipoDocumento,
              actividadEconomica: empresa.actividadEconomica,
              condicionContribuyente: empresa.condicion,
              estadoRuc: empresa.estado,
            });
            localStorage.setItem('razonSocial', empresa.razonSocial);
            localStorage.setItem('tipoDocumento', empresa.tipoDocumento);
            localStorage.setItem('actividadEconomica', empresa.actividadEconomica);
            localStorage.setItem('condicionContribuyente', empresa.condicion);
            localStorage.setItem('estadoRuc', empresa.estado);
          }
        } else {
          console.error('Error consultando datos de la empresa:', await response.text());
        }
      } catch (error) {
        console.error('Error en fetch de empresa:', error);
      }
    }
  };

  const handleEmailChange = (event) => {
    const newValue = event.target.value;
    setFormData((prev) => ({ ...prev, email: newValue }));
    updateSolicitanteData({ email: newValue });
    setEmailError(validateEmail(newValue));
  };

  const handleTelefonoChange = (event) => {
    let newValue = event.target.value.replace(/[^0-9]/g, "");
    newValue = newValue.substring(0, 9);
    setFormData((prev) => ({ ...prev, telefono: newValue }));
    updateSolicitanteData({ telefono: newValue });
    setTelefonoError(validateTelefono(newValue));
  };

  let requiredFields = [
    'email',
    'telefono',
    'direccionNum',
    'direccionNombre',
    'urbanizacionNombre',
    'distrito',
    'provincia',
    'ruc',
  ];

  if (selectedType === 'juridica') {
    requiredFields.push('razonSocial');
  } else {
    requiredFields.push('documentType', 'documentNumber', 'nombre');
  }

  const areFieldsFilled = requiredFields.every(
    (field) => formData[field] && formData[field].toString().trim() !== ''
  );

  const isFormValid =
    selectedType === 'juridica'
      ? areFieldsFilled && rucError === "" && emailError === "" && telefonoError === ""
      : areFieldsFilled &&
        dniError === "" &&
        nameError === "" &&
        rucError === "" &&
        emailError === "" &&
        telefonoError === "" &&
        (formData.documentType === 'DNI'
          ? formData.documentNumber.length === 8
          : formData.documentType === 'CE'
          ? formData.documentNumber.length >= 8 && formData.documentNumber.length <= 12
          : false);

  // Botón para crear el tipo de contribuyente usando solo los datos requeridos
  const handleCrearTipoContribuyente = async () => {
    try {
      const payload = {
        actividadEconomica: solicitanteData.actividadEconomica || formData.actividadEconomica,
        condicionContribuyente: solicitanteData.condicionContribuyente || formData.condicionContribuyente,
        estadoRuc: solicitanteData.estadoRuc || formData.estadoRuc,
        nombreRazonSocial: solicitanteData.razonSocial || formData.razonSocial,
        numeroDocumento: solicitanteData.ruc || formData.ruc,
        tipoDocumento: solicitanteData.tipoDocumento || formData.tipoDocumento,
      };
  
      console.log('Enviando tipoContribuyente:', payload);
  
      const response = await fetch('http://localhost:8080/api/v1/authentication/create/tipoContribuyente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error al crear tipoContribuyente:', errorText);
        throw new Error('No se pudo crear el tipoContribuyente');
      }
  
      const result = await response.json();
      console.log('Creación exitosa:', result);
      
      // Captura el tipoContribuyenteId desde la respuesta.
      const tipoContribuyenteId = result.data?.tipoContribuyenteId || result.data?.id;
      if (tipoContribuyenteId) {
        localStorage.setItem('tipoContribuyenteId', tipoContribuyenteId);
      } else {
        console.error('No se encontró el tipoContribuyenteId en la respuesta.');
      }
      
      alert('Tipo de Contribuyente creado con éxito');
    } catch (error) {
      console.error('Error al crear el tipo de contribuyente:', error);
      alert('Ocurrió un error al crear el tipo de contribuyente');
    }
  };
  
  return (
    <FormLayout
      headerTitle="Trámite de Licencia"
      contentTitle="Datos del Solicitante"
      contentSubtitle="Complete los datos del solicitante de la licencia"
    >
      <Box sx={styles.formContainer}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box sx={styles.sectionContainer}>
              <Typography variant="subtitle1" sx={styles.sectionTitle}>
                Buscar datos del solicitante
              </Typography>
              <TextField
                fullWidth
                label="N° DNI / CE"
                placeholder="Ingrese número"
                variant="outlined"
                size="small"
                value={formData.documentNumber}
                onChange={handleDocumentNumberChange}
                disabled={selectedType === 'juridica'}
                sx={styles.textField}
                error={Boolean(dniError)}
                helperText={dniError}
                inputProps={{ maxLength: formData.documentType === 'DNI' ? 8 : 12 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select
                        variant="standard"
                        value={formData.documentType}
                        onChange={handleChange('documentType')}
                        disabled={selectedType === 'juridica'}
                        sx={styles.documentTypeSelect}
                        size="small"
                      >
                        <MenuItem value="">↓</MenuItem>
                        <MenuItem value="DNI">DNI</MenuItem>
                        <MenuItem value="CE">CE</MenuItem>
                      </Select>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={styles.sectionContainer}>
              <Typography variant="subtitle1" sx={styles.sectionTitle}>
                Información del Solicitante
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {selectedType === 'juridica' ? (
                    <TextField
                      fullWidth
                      label="Razón Social"
                      placeholder="Ingrese razón social"
                      variant="outlined"
                      size="small"
                      value={formData.razonSocial}
                      onChange={handleChange('razonSocial')}
                      sx={styles.textField}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      label="Apellidos y Nombres"
                      placeholder="Ingrese apellidos y nombres"
                      variant="outlined"
                      size="small"
                      value={formData.nombre}
                      onChange={handleNameFieldChange}
                      sx={styles.textField}
                      error={Boolean(nameError)}
                      helperText={nameError}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="N° RUC"
                    placeholder="Ingrese su RUC"
                    variant="outlined"
                    size="small"
                    value={formData.ruc}
                    onChange={handleRucChange}
                    sx={styles.textField}
                    error={Boolean(rucError)}
                    helperText={rucError}
                    inputProps={{ maxLength: 11 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Correo Electrónico"
                    placeholder="Ingrese su correo"
                    variant="outlined"
                    size="small"
                    value={formData.email}
                    onChange={handleEmailChange}
                    sx={styles.textField}
                    error={Boolean(emailError)}
                    helperText={emailError}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="N° Teléfono"
                    placeholder="Ingrese su teléfono"
                    variant="outlined"
                    size="small"
                    value={formData.telefono}
                    onChange={handleTelefonoChange}
                    sx={styles.textField}
                    error={Boolean(telefonoError)}
                    helperText={telefonoError}
                    inputProps={{ maxLength: 9 }}
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="N° Int. / Mz. / Otros"
                    placeholder="Número o identificación"
                    variant="outlined"
                    size="small"
                    value={formData.direccionNum}
                    onChange={handleChange('direccionNum')}
                    sx={styles.textField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Select
                            variant="standard"
                            value={formData.tipoDireccionNum || ''}
                            onChange={handleChange('tipoDireccionNum')}
                            sx={styles.documentTypeSelect}
                            size="small"
                          >
                            <MenuItem value="">↓</MenuItem>
                            <MenuItem value="N° Int.">N° Int.</MenuItem>
                            <MenuItem value="Mz Lt">Mz Lt</MenuItem>
                            <MenuItem value="Otros">Otros</MenuItem>
                          </Select>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Av. / Jr. / Ca. / Pje. / Otros"
                    placeholder="Nombre de la vía"
                    variant="outlined"
                    size="small"
                    value={formData.direccionNombre}
                    onChange={handleChange('direccionNombre')}
                    sx={styles.textField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Select
                            variant="standard"
                            value={formData.tipoDireccion || ''}
                            onChange={handleChange('tipoDireccion')}
                            sx={styles.documentTypeSelect}
                            size="small"
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Urb. / AAHH. / Otros"
                    placeholder="Nombre de urbanización o asentamiento"
                    variant="outlined"
                    size="small"
                    value={formData.urbanizacionNombre}
                    onChange={handleChange('urbanizacionNombre')}
                    sx={styles.textField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Select
                            variant="standard"
                            value={formData.tipoUrbanizacion || ''}
                            onChange={handleChange('tipoUrbanizacion')}
                            sx={styles.documentTypeSelect}
                            size="small"
                          >
                            <MenuItem value="">↓</MenuItem>
                            <MenuItem value="Urb.">Urb.</MenuItem>
                            <MenuItem value="AAHH.">AAHH.</MenuItem>
                            <MenuItem value="Otro.">Otro.</MenuItem>
                          </Select>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" sx={styles.textField} size="small">
                    <InputLabel>Provincia</InputLabel>
                    <Select
                      label="Provincia"
                      value={selectedProvincia}
                      onChange={handleProvinciaChange}
                    >
                      <MenuItem value="">Seleccione una provincia</MenuItem>
                      {provincias.map((provincia) => (
                        <MenuItem key={provincia.id} value={provincia.provincia}>
                          {provincia.provincia}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" sx={styles.textField} size="small">
                    <InputLabel>Distrito</InputLabel>
                    <Select
                      label="Distrito"
                      value={selectedDistrito}
                      onChange={handleDistritoChange}
                    >
                      <MenuItem value="">Seleccione un distrito</MenuItem>
                      {filteredDistritos.map((distrito) => (
                        <MenuItem key={distrito.id} value={distrito.distrito}>
                          {distrito.distrito}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <FormNavigation currentStepIndex={currentStepIndex} isValid={isFormValid} />
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
};

export default SolicitantePage;
