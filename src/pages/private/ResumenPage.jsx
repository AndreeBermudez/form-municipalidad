import { Box, Divider, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { FormSend } from '../../features/licencia/components/navigation/FormSend';
import { useFormNavigation } from '../../features/licencia/hooks/useFormNavigation';
import { FormLayout } from '../../layout/FormLayout';
import { useAuthStorage } from '../../storage/authStorage';
import { useFormStorage } from '../../storage/formStorage';

export const ResumenPage = () => {
  const { currentStepIndex } = useFormNavigation();
  const tipoContribuyente = useAuthStorage((state) => state.tipoContribuyente) || 'juridica';
  const token = useAuthStorage((state) => state.token) || localStorage.getItem('authMunicipalidadToken');

  const tipoLicenciaData = useFormStorage((state) => state.tipoLicenciaData);
  const solicitanteData = useFormStorage((state) => state.solicitanteData);
  const representanteData = useFormStorage((state) => state.representanteData);
  const establecimientoData = useFormStorage((state) => state.establecimientoData);
  const ubicacionData = useFormStorage((state) => state.ubicacionData);
  const declaracionData = useFormStorage((state) => state.declaracionData);

  const direccionSolicitante = `${solicitanteData.tipoDireccion} ${solicitanteData.direccionNombre} ${solicitanteData.tipoDireccionNum} ${solicitanteData.direccionNum}, ${solicitanteData.tipoUrbanizacion} ${solicitanteData.urbanizacionNombre}, ${solicitanteData.distrito}, ${solicitanteData.provincia}`;
  const direccionEstablecimiento = `${establecimientoData.tipoDireccion} ${establecimientoData.direccionNombre} ${establecimientoData.tipoDireccionNum} ${establecimientoData.direccionNum}, ${establecimientoData.tipoUrbanizacion} ${establecimientoData.urbanizacionNombre}, ${establecimientoData.provincia}`;

  const formData = {
    modalidad: tipoLicenciaData.tipo,
    ruc: solicitanteData.ruc,
    nombreSolicitante:
      tipoContribuyente === 'juridica'
        ? solicitanteData.razonSocial
        : solicitanteData.nombre,
    dniCE:
      tipoContribuyente === 'natural'
        ? (solicitanteData.documentNumber || localStorage.getItem('dni') || "")
        : "",
    correo: solicitanteData.email || localStorage.getItem('correo') || "",
    direccionSolicitante: direccionSolicitante,
    representanteNombre: representanteData.nombreCompleto,
    representanteDni: representanteData.documentNumber,
    representantePartida: representanteData.partidaElectronica,
    representanteAsiento: representanteData.asientoInscripcion,
    nombreComercial: establecimientoData.nombreComercial,
    codigoCIIU: establecimientoData.codigoCiiu,
    giro: establecimientoData.giro,
    actividad: establecimientoData.actividad,
    direccionEstablecimiento: direccionEstablecimiento,
    areaSolicitada: ubicacionData.area,
    declaraciones: 'Todas las declaraciones han sido aceptadas',
  };

  // Función que ejecuta en secuencia los endpoints
  const handleSubmit = async () => {
    try {
      // 1. Crear Tipo Contribuyente
      const payloadTipo = {
        actividadEconomica: solicitanteData.actividadEconomica || "",
        condicionContribuyente: solicitanteData.condicionContribuyente || "",
        estadoRuc: solicitanteData.estadoRuc || "",
        nombreRazonSocial: solicitanteData.razonSocial || "",
        numeroDocumento: solicitanteData.ruc || "",
        tipoDocumento: solicitanteData.tipoDocumento || "",
        usuarioResponsable: "system",
        representanteLegal: representanteData.nombreCompleto || "",
        asientoRepresentanteLegal: representanteData.asientoInscripcion || "",
        dniRepresentanteLegal: representanteData.documentNumber || "",
        numPartidaRepresentanteLegal: representanteData.partidaElectronica || ""
      };
      console.log("Enviando tipoContribuyente:", payloadTipo);

      const respTipo = await fetch("http://localhost:8080/api/v1/authentication/create/tipoContribuyente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadTipo)
      });
      if (!respTipo.ok) {
        const errorText = await respTipo.text();
        throw new Error("Error en tipoContribuyente: " + errorText);
      }
      const resultTipo = await respTipo.json();
      console.log("TipoContribuyente creado:", resultTipo);
      const tipoContribuyenteId = resultTipo.data?.tipoContribuyenteId || resultTipo.data?.id;
      if (!tipoContribuyenteId) throw new Error("No se obtuvo tipoContribuyenteId");

      // Crear dirección del ciudadano (para cualquier tipo)
      const dni = localStorage.getItem('dni');
      if (!dni) throw new Error("No se encontró el DNI en localStorage");
      const payloadCiudadanoDireccion = {
        provincia: solicitanteData.provincia || "",
        avenida: solicitanteData.direccionNombre || "",
        manzana: solicitanteData.direccionNum || "",
        urbanizacion: solicitanteData.urbanizacionNombre || "",
        distrito: solicitanteData.distrito || "",
        usuarioResponsable: "anonymous" // Ajusta según corresponda
      };
      console.log("Enviando dirección del ciudadano:", payloadCiudadanoDireccion);
      const respCiudadanoDireccion = await fetch(`http://localhost:8080/api/v1/ciudadano/direccion/create/${dni}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payloadCiudadanoDireccion)
      });
      if (!respCiudadanoDireccion.ok) {
        const errorText = await respCiudadanoDireccion.text();
        throw new Error("Error en dirección del ciudadano: " + errorText);
      }
      const resultCiudadanoDireccion = await respCiudadanoDireccion.json();
      console.log("Dirección del ciudadano creada:", resultCiudadanoDireccion);

      // 2. Crear Negocio
      const ciudadanoId = localStorage.getItem("ciudadanoId") || "0";
      const payloadNegocio = {
        actividad: establecimientoData.actividad || "",
        nombre: establecimientoData.nombreComercial || "",
        zonificacion: establecimientoData.zonificacion || "",
        giroId: establecimientoData.giroId || "",
        area: ubicacionData.area || 1,
        ciudadanoId: parseInt(ciudadanoId, 10),
        tipoContribuyenteId: parseInt(tipoContribuyenteId, 10)
      };
      console.log("Enviando negocio:", payloadNegocio);
      const respNegocio = await fetch("http://localhost:8080/api/v1/authentication/create/negocio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadNegocio)
      });
      if (!respNegocio.ok) {
        const errorText = await respNegocio.text();
        throw new Error("Error en negocio: " + errorText);
      }
      const resultNegocio = await respNegocio.json();
      console.log("Negocio creado:", resultNegocio);
      const businessId = resultNegocio.data?.negocioId || resultNegocio.data?.id || resultNegocio.id;
      if (!businessId) throw new Error("No se obtuvo businessId");

      // 3. Crear Dirección (para el negocio)
      const payloadDireccion = {
        provincia: establecimientoData.provincia || "",
        avenida: establecimientoData.direccionNombre || "",
        manzana: establecimientoData.direccionNum || "",
        urbanizacion: establecimientoData.urbanizacionNombre || "",
        distrito: solicitanteData.distrito || "",
        coordenadas: `${ubicacionData.lat},${ubicacionData.lng}`
      };
      console.log("Enviando dirección del negocio:", payloadDireccion);
      const direccionUrl = `http://localhost:8080/api/v1/authentication/${businessId}/direccion`;
      const respDireccion = await fetch(direccionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadDireccion)
      });
      if (!respDireccion.ok) {
        const errorText = await respDireccion.text();
        throw new Error("Error en dirección del negocio: " + errorText);
      }
      const resultDireccion = await respDireccion.json();
      console.log("Dirección del negocio creada:", resultDireccion);

      // 4. Crear Declaración Jurada
      const payloadDeclaracion = {
        estado: "SOLUCIONADO",
        puntoDeclaracionIds: declaracionData.puntosDeclaracion || []
      };
      console.log("Enviando declaración jurada:", payloadDeclaracion);
      const respDeclaracion = await fetch("http://localhost:8080/api/v1/authentication/create/declaracion-jurada", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadDeclaracion)
      });
      if (!respDeclaracion.ok) {
        const errorText = await respDeclaracion.text();
        throw new Error("Error en declaración jurada: " + errorText);
      }
      const resultDeclaracion = await respDeclaracion.json();
      console.log("Declaración jurada creada:", resultDeclaracion);

      // 4.1. Llamar al endpoint de zonificación para obtener codigoZonificacionId
      let codigoZonificacionId = null;
      if (establecimientoData.zonificacion) {
        const respZon = await fetch(`http://localhost:8080/api/v1/public/search/${establecimientoData.zonificacion}`);
        if (!respZon.ok) {
          const errorText = await respZon.text();
          throw new Error("Error consultando la info de la zonificación: " + errorText);
        }
        const resultZonificacion = await respZon.json();
        console.log("JSON completo de la zonificación:", resultZonificacion);
        codigoZonificacionId = resultZonificacion.data?.codigoZonificacionId || null;
      }

      // 5. Crear Licencia
      const hoyDate = new Date();
      const vigenciaISO =
        tipoLicenciaData.tipo === 'Indeterminada'
          ? null
          : new Date(hoyDate.setFullYear(hoyDate.getFullYear() + 1)).toISOString().split("T")[0];
      const declaracionJuradaId = resultDeclaracion.data?.declaracionJuradaId || resultDeclaracion.data?.id;
      if (!declaracionJuradaId) throw new Error("No se obtuvo declaracionJuradaId");

      const payloadLicencia = {
        vigencia: vigenciaISO,
        ciudadanoId: parseInt(ciudadanoId, 10),
        declaracionJuradaId: parseInt(declaracionJuradaId, 10),
        codigoZonificacionId: codigoZonificacionId ? parseInt(codigoZonificacionId, 10) : null
      };
      console.log("Enviando licencia:", payloadLicencia);

      const respLicencia = await fetch("http://localhost:8080/api/v1/authentication/create/licencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadLicencia)
      });
      if (!respLicencia.ok) {
        const errorText = await respLicencia.text();
        throw new Error("Error en licencia: " + errorText);
      }
      const resultLicencia = await respLicencia.json();
      console.log("Licencia creada:", resultLicencia);

      alert("Formulario enviado correctamente");
    } catch (error) {
      console.error("Error en el envío del formulario:", error);
      alert("Error al enviar el formulario: " + error.message);
    }
  };

  return (
    <FormLayout
      headerTitle="Trámite de Licencia"
      contentTitle="Resumen Final del Formulario"
      contentSubtitle="Verifique la información antes de enviar"
      showSteps={false}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
        <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
          <Grid container spacing={1}>
            {/* Sección Modalidad */}
            <Grid item xs={12}>
              <Box sx={{ mb: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: '#2c3e50', fontWeight: 600, mb: 1, fontSize: '1.1rem' }}
                >
                  Modalidad
                </Typography>
                <TextField
                  fullWidth
                  value={formData.modalidad}
                  disabled
                  placeholder="Tipo de licencia seleccionada"
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc',
                    },
                  }}
                />
              </Box>
            </Grid>

            {/* Datos del Solicitante */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: '#2c3e50', fontWeight: 600, mb: 1, fontSize: '1.1rem' }}
                >
                  Datos del Solicitante
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Número RUC" value={formData.ruc} disabled variant="outlined" size="small" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Nombre / Razón Social" value={formData.nombreSolicitante} disabled variant="outlined" size="small" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Número DNI/CE" value={formData.dniCE} disabled variant="outlined" size="small" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Correo Electrónico" value={formData.correo} disabled variant="outlined" size="small" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Dirección" value={formData.direccionSolicitante} disabled variant="outlined" size="small" />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Representante Legal (solo para persona jurídica) */}
            {tipoContribuyente === 'juridica' && (
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: '#2c3e50', fontWeight: 600, mb: 1, fontSize: '1.1rem' }}
                  >
                    Representante Legal
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Apellidos y Nombres" value={formData.representanteNombre} disabled variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Número DNI/CE" value={formData.representanteDni} disabled variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Número de partida electrónica" value={formData.representantePartida} disabled variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Número de asiento de inscripción" value={formData.representanteAsiento} disabled variant="outlined" size="small" />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            )}

            {/* Datos del Establecimiento */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: '#2c3e50', fontWeight: 600, mb: 1, fontSize: '1.1rem' }}
                >
                  Datos del Establecimiento
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Nombre Comercial" value={formData.nombreComercial} disabled variant="outlined" size="small" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Código CIIU" value={formData.codigoCIIU} disabled variant="outlined" size="small" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Giro" value={formData.giro} disabled variant="outlined" size="small" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Actividad" value={formData.actividad} disabled variant="outlined" size="small" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Dirección Establecimiento" value={formData.direccionEstablecimiento} disabled variant="outlined" size="small" />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Ubicación del Establecimiento */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: '#2c3e50', fontWeight: 600, mb: 1, fontSize: '1.1rem' }}
                >
                  Ubicación del Establecimiento
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Área total solicitada (m²)" value={formData.areaSolicitada} disabled variant="outlined" size="small" />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Declaraciones Juradas */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: '#2c3e50', fontWeight: 600, mb: 1, fontSize: '1.1rem' }}
                >
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
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            mt: 'auto',
            borderTop: '1px solid #e2e8f0',
            pt: 2,
            pb: 1,
            px: 1,
            backgroundColor: 'white',
          }}
        >
          <FormSend currentStepIndex={currentStepIndex} handleSubmit={handleSubmit} />
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
      backgroundColor: '#f8fafc',
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
};

export default ResumenPage;
