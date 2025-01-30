import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

//CODIGO PARA QUE NOS LLEVE A CHIMBOTE POR DEFECTO OÑO
const defaultCenter = {
  lat: -9.0744, 
  lng: -78.5936,
};

const GoogleMapComponent = ({ setAddress }) => {
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });

   
    setAddress(`Lat: ${lat}, Lng: ${lng}`);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.AIzaSyAptfrdHFwOZN_7SOu9qG5vtsxIGbpp_kY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selectedLocation}
        zoom={15}
        onClick={handleMapClick}
      >
        <Marker position={selectedLocation} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
