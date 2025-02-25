import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import { RoutesWithNotFound } from './components/RoutesWithNotFound';
import { PrivateGuard } from './guards/PrivateGuard';
import { PrivateRouter } from './PrivateRouter';
import { FormPage } from '../pages/private/FormPage';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<RoutesWithNotFound>
				<Route path='/' element={<Navigate to={'/home'} />} />
				<Route path='/home' element={<FormPage />} />
				<Route element={<PrivateGuard />}>
					<Route path='/form/*' element={<PrivateRouter />} />
				</Route>
			</RoutesWithNotFound>
		</BrowserRouter>
	);
};
