import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import { RoutesWithNotFound } from './components/RoutesWithNotFound';
import { PrivateGuard } from './guards/PrivateGuard';
import { PrivateRouter } from './PrivateRouter';
import { LoginPage } from '../pages/LoginPage';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<RoutesWithNotFound>
				<Route path='/' element={<Navigate to={'/login'} />} />
				<Route path='/login' element={<LoginPage />} />
				<Route element={<PrivateGuard />}>
					<Route path='/formulario/*' element={<PrivateRouter />} />
				</Route>
			</RoutesWithNotFound>
		</BrowserRouter>
	);
};
