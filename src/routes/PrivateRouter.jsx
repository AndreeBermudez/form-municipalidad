import { Navigate, Route, Routes } from 'react-router-dom';
import { ModalidadPage } from '../pages/private/ModalidadPage';
import { SolicitantePage } from '../pages/private/SolicitantePage';
import { RepresentantePage } from '../pages/private/RepresentantePage';
import { EstablecimientoPage } from '../pages/private/EstablecimientoPage';
import { UbicacionPage } from '../pages/private/UbicacionPage';
import { DeclaracionPage } from '../pages/private/DeclaracionPage';
import { ResumenPage } from '../pages/private/ResumenPage';

export const PrivateRouter = () => {
	return (
		<Routes>
			<Route path='' element={<Navigate to={'modalidad'} />} />
			<Route path='modalidad' element={<ModalidadPage />} />
			<Route path='solicitante' element={<SolicitantePage />} />
			<Route path='representante' element={<RepresentantePage />} />
			<Route path='establecimiento' element={<EstablecimientoPage />} />
			<Route path='ubicacion' element={<UbicacionPage />} />
			<Route path='declaracion' element={<DeclaracionPage />} />
			<Route path='resumen' element={<ResumenPage />} />
		</Routes>
	);
};
