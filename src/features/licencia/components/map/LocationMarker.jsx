import { Marker, Popup, useMapEvents } from "react-leaflet";

export const LocationMarker = ({position, handlePosition}) => {

	const map = useMapEvents({
		click(e) {
			handlePosition(e.latlng);
		},
	});

	return position === null ? null : (
		<Marker position={position}>
			<Popup>Ubicación seleccionada</Popup>
		</Marker>
	);
};
