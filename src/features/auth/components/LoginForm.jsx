import { useState } from 'react';
import { ContributorTypeSelector } from './ContributorTypeSelector';

export const LoginForm = ({ onSubmit, isLoading, error }) => {
	const [selectedType, setSelectedType] = useState('juridica');
	const [paymentCode, setPaymentCode] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ type: selectedType, paymentCode });
	};

	return (
		<div className='p-6 flex flex-col justify-center'>
			<div className='max-w-md mx-auto w-full'>
				<form onSubmit={handleSubmit} className='border rounded-lg p-5 shadow-md bg-white'>
					<h2 className='text-2xl font-bold text-center mb-5'>Ingrese sus Datos</h2>
					<ContributorTypeSelector selectedType={selectedType} onTypeChange={setSelectedType} />
					{/* Campo Código de Pago */}
					<div className='mb-4'>
						<label htmlFor='paymentCode' className='block text-sm font-medium text-gray-700'>
							CÓDIGO DE PAGO
						</label>
						<input
							type='text'
							id='paymentCode'
							name='paymentCode'
							value={paymentCode}
							onChange={(e) => setPaymentCode(e.target.value)}
							placeholder='Ingrese su código de pago'
							className='form-input border rounded-lg w-full p-2'
							disabled={isLoading}
						/>
					</div>

					{error && <div className='text-red-500 text-sm mb-3'>{error}</div>}

					{/* Enlace y Botón de Ingreso */}
					<button type='button' className='text-blue-500 text-sm hover:underline mt-3 w-full text-center'>
						NO TENGO CÓDIGO DE PAGO
					</button>

					<button
						type='submit'
						disabled={isLoading}
						className='w-full bg-red-600 hover:bg-red-700 text-white text-lg py-2 px-4 rounded-md transition duration-300 ease-in-out mt-4 disabled:bg-red-400 disabled:cursor-not-allowed'>
						{isLoading ? 'Procesando...' : 'Ingresar'}
					</button>

					{/* Mensaje de Información */}
					<div className='bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mt-3'>
						Recuerde: El código de pago se encuentra ubicado en el voucher que la municipalidad brinda al pagar por
						su trámite
					</div>
				</form>
			</div>
		</div>
	);
};
