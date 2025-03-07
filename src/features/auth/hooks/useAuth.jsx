import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStorage } from '../../../storage/authStorage';

export const useAuth = () => {
	const navigate = useNavigate();
	const iniciarSesion = useAuthStorage((state) => state.iniciarSesion);
	const setContribuyente = useAuthStorage((state) => state.setContribuyente);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleLogin = async ({ type, paymentCode }) => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await iniciarSesion(paymentCode);
			if (response.success) {
				setContribuyente(type);
				navigate('/formulario/modalidad');
				return true;
			} else {
				setError(response.error || 'Error de autenticación');
				return false;
			}
		} catch (error) {
			setError('Error inesperado. Por favor, intente nuevamente.');
			console.error('Error de autenticación:', error);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	return { handleLogin, isLoading, error };
};
