import { Route, Routes } from 'react-router-dom';
import FormPageOne from '../pages/private/FormPageOne';
import FormPageInder from '../pages/private/FormPageInder';
import FormPageRepresentante from '../pages/private/FormPageRepresentante';
import FormPageEstablecimiento from '../pages/private/FormPageEstablecimiento';
import FormPageUbicacion from '../pages/private/FormPageUbicacion';
import FormPageDeclaracion from '../pages/private/FormPageDeclaracion';
import FormularioResumen from '../pages/private/FormularioResumen'; // 👈 Añade esta línea

export const PrivateRouter = () => {
	return (
		<Routes>
			<Route path='pag-one' element={<FormPageOne />} />
			<Route path='pag-inder' element={<FormPageInder />} />
			<Route path='pag-representante' element={<FormPageRepresentante />} />
			<Route path='pag-establecimiento' element={<FormPageEstablecimiento />} />
			<Route path='pag-ubicacion' element={<FormPageUbicacion />} />
			<Route path='pag-declaracion' element={<FormPageDeclaracion />} />
			<Route path='resumen' element={<FormularioResumen />} /> {/* 👈 Añade esta ruta */}
		</Routes>
	);
};
