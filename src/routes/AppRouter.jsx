import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import { RoutesWithNotFound } from './components/RoutesWithNotFound';
import { PrivateGuard } from './guards/PrivateGuard';
import { PrivateRouter } from './PrivateRouter';
import InicioForm from '../pages/public/InicioForm';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<RoutesWithNotFound>
				<Route path='/' element={<Navigate to={'/home'} />} />
				<Route path='/home' element={<InicioForm />} />
				<Route element={<PrivateGuard />}>
					<Route path='/formulario/*' element={<PrivateRouter />} />
				</Route>
			</RoutesWithNotFound>
		</BrowserRouter>
	);
};
