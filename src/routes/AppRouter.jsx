import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import InicioForm from '../pages/public/InicioForm';
import { PrivateGuard } from './guards/PrivateGuard';
import { PrivateRouter } from './PrivateRouter';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Navigate to={'/inicio'} />} />
				<Route path='/inicio' element={<InicioForm />} />
				<Route element={<PrivateGuard />}>
					<Route path='/formulario/*' element={<PrivateRouter />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
