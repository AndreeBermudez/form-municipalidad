import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import useGeolocation from "../../hooks/useGeolocation";

const containerStyle = {
  width: "100%",
  height: "300px",
};

//CODIGO PARA QUE NOS LLEVE A CHIMBOTE POR DEFECTO
const defaultCenter = {
  lat: -9.0744,
  lng: -78.5936,
};

const GoogleMapComponent = ({ setAddress }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  
  const [userPosition, setUserPosition] = useLocalStorage("USER_MARKER", {
    lat: defaultCenter.lat,
    lng: defaultCenter.lng,
  });

  const [nearbyMarkers, setNearbyMarkers] = useLocalStorage(
    "NEARBY_MARKERS",
    []
  );

  const location = useGeolocation();

  useEffect(() => {
    if (location.latitude && location.longitude) {
      setUserPosition({
        lat: location.latitude,
        lng: location.longitude
      });
    }
  }, [location]);

  const onLoad = (map) => {
    mapRef.current = map;
    setMap(map);
  };

  const onUnmount = () => {
    mapRef.current = null;
    setMap(null);
  };

  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    setNearbyMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

    // Obtener la dirección usando la Geocoding API
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: newMarker }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address);
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userPosition}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
      >
        {/* Marcador del usuario */}
        <Marker
          position={userPosition}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }}
        />

        {/* Marcadores cercanos */}
        {nearbyMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            label={`${index + 1}`}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
