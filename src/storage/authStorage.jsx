import { create } from 'zustand';
import { instance } from '../service/apiClient';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuthStorage = create(
	persist((set) => ({
		codigoPago: null,
		tipoContribuyente: null,	
		codigoPagoAutenticado: false,
		token: null,
		iniciarSesion: async (codigoPago) => {
            try {
                if (!codigoPago) {
                    throw new Error('El código de pago es requerido');
                }
                const { status, data } = await instance.post('authentication/singin/ciudadano', {
                    codigoPago,
                });
                if (status === 200 && data?.token) {
                    set({
                        codigoPagoAutenticado: true,
                        codigoPago,
                        token: data.token,
                    });
                    localStorage.setItem('authMunicipalidadToken', data.token);
                    return { success: true };
                }
                return { success: false, error: 'Credenciales inválidas' };
            } catch (error) {
                console.error('Error en inicio de sesión:', error);
                return {
                    success: false,
                    error: error.message || 'Error al iniciar sesión. Intente nuevamente.'
                };
            }
		},
		setContribuyente: (tipo) => {
			set({
				tipoContribuyente: tipo,
			});
		},
		validarCodigo: async () => {},
		logout: () => {
			localStorage.removeItem('authMunicipalidadToken');
			set({
				codigoPagoAutenticado: false,
				codigoPago: null,
				token: null,
			});
		},
	}),
	{
		name: 'authStorage',
		storage: createJSONStorage(() => localStorage),
		partialize: (state) => ({
			codigoPago: state.codigoPago,
			tipoContribuyente: state.tipoContribuyente,
			codigoPagoAutenticado: state.codigoPagoAutenticado
		}),
	}
));
