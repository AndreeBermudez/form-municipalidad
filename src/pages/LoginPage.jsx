import logo from '../assets/imagenes/Escudo_de_Nuevo_Chimbote.png'
import { useAuth } from '../features/auth/hooks/useAuth';
import { AuthLayout } from '../layout/AuthLayout';
import { LeftPanel } from '../features/auth/components/LeftPanel';
import { LoginForm } from '../features/auth/components/LoginForm';

export const LoginPage = () => {
	const { handleLogin, isLoading, error } = useAuth();

	return (
		<AuthLayout>
			<LeftPanel
				logoSrc={logo}
				title='Trámite de Licencia'
				description='Municipalidad de Nuevo Chimbote le ofrece esta plataforma virtual 
                     para la gestión eficiente de sus trámites documentarios.'
			/>
			<LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
		</AuthLayout>
	);
};
