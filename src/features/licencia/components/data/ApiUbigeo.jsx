export const fetchProvincias = () => {
    return fetch('https://raw.githubusercontent.com/RitchieRD/ubigeos-peru-data/main/json/2_ubigeo_provincias.json')
      .then(response => response.json())
      .then(data => data.ubigeo_provincias.sort((a, b) => a.provincia.localeCompare(b.provincia)));
  };
  
 
  export const fetchDistritos = () => {
    return fetch('https://raw.githubusercontent.com/RitchieRD/ubigeos-peru-data/main/json/3_ubigeo_distritos.json')
      .then(response => response.json())
      .then(data => data.ubigeo_distritos.sort((a, b) => a.distrito.localeCompare(b.distrito)));
  };
  