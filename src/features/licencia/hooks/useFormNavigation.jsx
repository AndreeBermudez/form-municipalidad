import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStorage } from '../../../storage/authStorage';

export const useFormNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tipoContribuyente = useAuthStorage(state => state.tipoContribuyente) || 'juridica';

  // Definir la secuencia de rutas según el tipo de contribuyente
  const routeSequence = tipoContribuyente === 'juridica'
    ? [
        '/formulario/modalidad',
        '/formulario/solicitante', 
        '/formulario/representante', 
        '/formulario/establecimiento', 
        '/formulario/ubicacion', 
        '/formulario/declaracion',
        '/formulario/resumen'
      ]
    : [
        '/formulario/modalidad',
        '/formulario/solicitante', 
        '/formulario/establecimiento', 
        '/formulario/ubicacion', 
        '/formulario/declaracion',
        '/formulario/resumen'
      ];

  // Obtener el índice de la ruta actual
  const currentRouteIndex = routeSequence.findIndex(route => location.pathname === route);
  
  // Navegar al siguiente paso
  const goToNext = () => {
    if (currentRouteIndex < routeSequence.length - 1) {
      navigate(routeSequence[currentRouteIndex + 1]);
    }
  };

  // Navegar al paso anterior
  const goToPrevious = () => {
    if (currentRouteIndex > 0) {
      navigate(routeSequence[currentRouteIndex - 1]);
    }
  };

  // Navegar a un paso específico por índice
  const goToStep = (index) => {
    if (index >= 0 && index < routeSequence.length) {
      navigate(routeSequence[index]);
    }
  };

  return {
    goToNext,
    goToPrevious,
    goToStep,
    currentStepIndex: currentRouteIndex,
    totalSteps: routeSequence.length,
    isFirstStep: currentRouteIndex === 0,
    isLastStep: currentRouteIndex === routeSequence.length - 1,
  };
};