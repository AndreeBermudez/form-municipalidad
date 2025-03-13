
export const validateDNI = (dni) => {
    if (!dni) return "";
    if (!/^\d+$/.test(dni)) return "El DNI debe contener solo números";
    if (dni.startsWith("0")) return "El DNI no puede empezar por 0";
    if (dni.length !== 8) return "El DNI debe tener 8 dígitos"; // Validación de longitud
    const invalidValues = [
      "11111111", "22222222", "33333333", "44444444", 
      "55555555", "66666666", "77777777", "88888888", 
      "99999999", "12345678"
    ];
    if (invalidValues.includes(dni)) return "DNI inválido";
    return "";
  };
  
  export const validateCE = (ce) => {
    if (!ce) return "";
    if (!/^[A-Za-z0-9]+$/.test(ce))
      return "El carnet de extranjería debe contener solo letras y números";
    // Validación de que tenga exactamente 8 o 12 caracteres:
    if (ce.length !== 8 && ce.length !== 12)
      return "El carnet de extranjería debe tener 8 o 12 caracteres";
    return "";
  };
  
  export const validateName = (name) => {
    if (!name) return "";
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(name))
      return "El campo debe contener solo letras y espacios";
    return "";
  };
  
  export const validateRUC = (ruc) => {
    if (!ruc) return "";
    if (!/^\d+$/.test(ruc)) return "El RUC debe contener solo números";
    if (!/^(10|20)/.test(ruc)) return "El RUC debe empezar por 10 o 20";
    if (ruc.length !== 11) return "El RUC debe tener 11 dígitos";
    return "";
  };
  
  export const validateEmail = (email) => {
    if (!email) return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
      ? ""
      : "El correo debe tener un formato válido (ej. usuario@dominio.com)";
  };
  
  export const validateTelefono = (telefono) => {
    if (!telefono) return "";
   
    const sanitized = telefono.replace(/[^0-9]/g, "");
    if (sanitized[0] !== '9') return "El número de teléfono debe empezar por 9";
    if (sanitized.length > 9) return "El número de teléfono debe tener 9 dígitos máximo";
    return "";
  };
  export const validatePartidaElectronica = (partida) => {
    if (!partida) return "";
    if (!/^\d+$/.test(partida)) return "Solo se permiten números.";
    if (partida.length < 6 || partida.length > 12)
      return "El número de partida electrónica debe contener entre 6 y 12 dígitos.";
    return "";
  };

export const validateActivityNoNumbers = (activity) => {
  if (!activity) return "";
  
  if (/\d/.test(activity))
    return "El campo actividad no puede contener números";
  
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s,.-]+$/.test(activity))
    return "El campo actividad contiene caracteres no permitidos";
  return "";
};
export const validateArea = (area) => {
 
    if (!area) {
      return "El área no puede estar vacía";
    }
  
    if (Number(area) <= 0) {
      return "El área debe ser un número positivo";
    }
 
    return "";
  };
  
  
  
  