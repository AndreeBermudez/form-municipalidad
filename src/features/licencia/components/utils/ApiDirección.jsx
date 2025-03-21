// services/direccionService.js
export const crearDireccion = async (formData) => {
    try {
      const direccionJsonCreate = {
        provincia: formData.provincia,
        avenida: formData.direccionNombre, 
        manzana: formData.direccionNum,   
        distrito: formData.distrito,      
        urbanizacion: formData.urbanizacionNombre,
        coordenadas: null,
        usuarioResponsable: 'system',
      };
  
      const token = localStorage.getItem('authMunicipalidadToken');
  
      const response = await fetch(
        `http://localhost:8080/api/v1/ciudadano/direccion/create/${formData.documentNumber}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(direccionJsonCreate),
        }
      );
  
      if (!response.ok) {
        throw new Error('Error al crear la dirección');
      }
  
      const data = await response.json();
      console.log('Dirección creada con éxito:', data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  