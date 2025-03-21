import { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Button
} from '@mui/material';
import { FormLayout } from '../../layout/FormLayout';
import { useFormNavigation } from '../../features/licencia/hooks/useFormNavigation';
import { FormNavigation } from '../../features/licencia/components/navigation/FormNavigation';
import { useFormStorage } from '../../storage/formStorage';

export const DeclaracionPage = () => {
  const { currentStepIndex } = useFormNavigation();
  const updateDeclaracionData = useFormStorage((state) => state.updateDeclaracionData);

  // Estado para almacenar los puntos de declaración obtenidos del backend
  const [puntos, setPuntos] = useState([]);
  // Estado para almacenar qué checkboxes están marcados: clave = puntoDeclaracionId, valor = boolean
  const [selectedPoints, setSelectedPoints] = useState({});

  // Cargar los puntos de declaración desde el endpoint al montar el componente
  useEffect(() => {
    const fetchPuntos = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/authentication/all/puntodeclaracion');
        if (!response.ok) {
          throw new Error('Error al obtener puntos de declaración');
        }
        const result = await response.json();
        const data = result.data || [];
        // Ordenar los puntos por "numeroPunto" para asegurar el orden
        const sorted = data.sort((a, b) => a.numeroPunto - b.numeroPunto);
        setPuntos(sorted);
      } catch (error) {
        console.error('Error fetchPuntos:', error);
      }
    };
    fetchPuntos();
  }, []);

  // Actualizar el store global cada vez que cambie selectedPoints
  useEffect(() => {
    const seleccionados = Object.entries(selectedPoints)
      .filter(([id, checked]) => checked)
      .map(([id]) => parseInt(id));
    updateDeclaracionData({ puntosDeclaracion: seleccionados });
  }, [selectedPoints, updateDeclaracionData]);

  // Manejar el cambio de cada checkbox
  const handleCheckboxChange = (puntoId) => {
    setSelectedPoints((prev) => ({
      ...prev,
      [puntoId]: !prev[puntoId],
    }));
  };

  // Función para deshabilitar los checkboxes según el orden:
  // - El primer punto (numeroPunto = 1) siempre habilitado.
  // - El segundo (numeroPunto = 2) se habilita solo si el punto con id 1 está marcado.
  // - El tercer (numeroPunto = 3) se habilita solo si el punto con id 2 está marcado.
  const isDisabled = (numeroPunto) => {
    if (numeroPunto === 1) return false;
    if (numeroPunto === 2) return !selectedPoints[1];
    if (numeroPunto === 3) return !selectedPoints[2];
    return false;
  };

  // Verificar que se hayan marcado los puntos obligatorios (los que tienen obligatorio === true)
  const requiredPoints = puntos.filter((p) => p.obligatorio === true);
  const allRequiredSelected = requiredPoints.every(
    (p) => selectedPoints[p.puntoDeclaracionId]
  );
  const isValid = allRequiredSelected;

  // Función para enviar la declaración jurada al endpoint
  const handleEnviarDeclaracionJurada = async () => {
    try {
      // Obtenemos los IDs de los puntos seleccionados
      const puntoDeclaracionIds = Object.entries(selectedPoints)
        .filter(([id, checked]) => checked)
        .map(([id]) => parseInt(id));

      const payload = {
        estado: "SOLUCIONADO",
        puntoDeclaracionIds,
      };

      console.log('Enviando declaración jurada:', payload);

      const response = await fetch('http://localhost:8080/api/v1/authentication/create/declaracion-jurada', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error al enviar declaración jurada:', errorText);
        throw new Error('Error en el envío de la declaración jurada');
      }

      const result = await response.json();
      console.log('Declaración jurada enviada exitosamente:', result);
      alert('Declaración jurada enviada exitosamente');
    } catch (error) {
      console.error('Error en enviar declaración jurada:', error);
      alert('Error en enviar declaración jurada');
    }
  };

  return (
    <FormLayout
      headerTitle='Trámite de Licencia'
      contentTitle='Declaración Jurada'
      contentSubtitle='Lea atentamente y marque las declaraciones'
    >
      <Box sx={styles.formContainer}>
        <Box sx={styles.scrollArea}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box sx={styles.sectionContainer}>
                <Typography variant='subtitle1' sx={styles.sectionTitle}>
                  Declaraciones
                </Typography>
                {puntos.map((punto) => {
                  const id = punto.puntoDeclaracionId;
                  const isChecked = !!selectedPoints[id];
                  return (
                    <Box key={id} sx={styles.declarationContainer}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isChecked}
                            disabled={isDisabled(punto.numeroPunto)}
                            onChange={() => handleCheckboxChange(id)}
                          />
                        }
                        label={
                          <Typography variant='body2' sx={styles.declarationText}>
                            {punto.descripcion}
                          </Typography>
                        }
                      />
                    </Box>
                  );
                })}
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
    display: 'flex',
    flexDirection: 'column',
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
    mb: 3,
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
  declarationContainer: {
    mb: 2,
    p: 2,
    backgroundColor: '#f8fafc',
    borderRadius: 2,
    '& .MuiFormControlLabel-root': {
      margin: 0,
      alignItems: 'flex-start',
      '& .MuiCheckbox-root': {
        paddingTop: 0,
      },
    },
  },
  declarationText: {
    color: '#475569',
  },
};



export default DeclaracionPage;
