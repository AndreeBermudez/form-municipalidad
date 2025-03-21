
export const fetchPagoData = async (paymentCode) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/authentication/pagos/${paymentCode}`);
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Error al obtener datos');
      }
  
      const { data } = result;
      if (!data) {
        throw new Error('No se encontraron datos para ese código de pago.');
      }
  
      return data;
    } catch (error) {
      console.error('Error en fetchPagoData:', error);
      throw error;
    }
  };
  