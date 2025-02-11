import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressSteps from '../../components/ui/ProgressSteps';
import indeterminadaImg from '../../assets/imagenes/inderteminada.jpg';
import temporalImg from '../../assets/imagenes/reloj-tiempo.jpg';


const FormPageOne = () => {
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [dates, setDates] = useState({ from: '', to: '' });

	const steps = ['Modalidad', 'Solicitante', 'Representante', 'Establecimiento', 'Ubicación', 'Declaración'];
	const currentStep = 1;

	const handleNavigateToInder = () => {
		navigate('/formulario/pag-inder');
	};

	// Función para redirigir a InicioForm
	const handleSalir = () => {
		navigate('/inicio');
	};

	return (
		<div className='min-h-screen bg-gray-50 flex justify-center items-center p- sm:p-0'>
			<div className='w-full max-w-[900px] bg-white rounded-lg shadow-lg overflow-hidden'>
				<Header title='Trámite de Licencia' />
				<ProgressSteps steps={steps} currentStep={currentStep} />

				<div className='px-6 sm:px-10 py-3 pb-5'>
					<h2 className='text-center text-lg sm:text-2xl font-bold mb-2'>Licencia de Funcionamiento</h2>
					<p className='text-center text-gray-600 mb-4 text-sm sm:text-base'>
						Seleccione una opción según el tipo de licencia que desea solicitar.
					</p>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
						{/* Card de Indeterminada */}
						<div
							className='border rounded-lg p-3 cursor-pointer transition duration-300 ease-in-out shadow-md hover:shadow-xl w-full'
							onClick={handleNavigateToInder}>
							<img
								src={indeterminadaImg}
								alt='Indeterminada'
								className='w-full h-40 sm:h-52 object-cover rounded-lg mb-2'
							/>
							<h3 className='font-bold text-sm sm:text-base mb-1'>Indeterminada</h3>
							<p className='text-xs sm:text-sm text-gray-600'>
								Autorización para actividades económicas en un establecimiento determinado.
							</p>
						</div>

						{/* Card de Temporal con Modal */}
						<div
							className='border rounded-lg p-3 cursor-pointer transition duration-300 ease-in-out shadow-md hover:shadow-xl w-full'
							onClick={() => setShowModal(true)}>
							<img src={temporalImg} alt='Temporal' className='w-full h-40 sm:h-52 object-cover rounded-lg mb-2' />
							<h3 className='font-bold text-sm sm:text-base mb-1'>Temporal</h3>
							<p className='text-xs sm:text-sm text-gray-600'>
								Autorización para actividades comerciales, industriales o de servicios por un tiempo limitado.
							</p>
						</div>
					</div>

					{/* Botón de Salir */}
					<div className='mt-4 flex justify-end'>
						<button
							className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm'
							onClick={handleSalir}>
							Salir
						</button>
					</div>
				</div>

				{/* Modal para seleccionar fechas */}
				{showModal && (
					<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
						<div className='bg-white rounded-lg shadow-xl w-full max-w-sm p-6 flex flex-col justify-between'>
							<h2 className='text-lg sm:text-xl font-bold text-center'>Licencia Temporal</h2>
							<p className='text-sm text-center text-gray-600'>Seleccione la fecha de inicio y fin.</p>

							<div className='space-y-3 mt-3'>
								<div>
									<label className='block font-medium text-sm'>Desde:</label>
									<input
										type='date'
										className='w-full border rounded-lg p-2 text-sm'
										value={dates.from}
										onChange={(e) => setDates({ ...dates, from: e.target.value })}
									/>
								</div>

								<div>
									<label className='block font-medium text-sm'>Hasta:</label>
									<input
										type='date'
										className='w-full border rounded-lg p-2 text-sm'
										value={dates.to}
										onChange={(e) => setDates({ ...dates, to: e.target.value })}
									/>
								</div>
							</div>

							<div className='flex justify-between mt-4'>
								<button
									className='bg-gray-500 text-white px-4 py-2 rounded-lg text-sm'
									onClick={() => setShowModal(false)}>
									Cancelar
								</button>
								<button
									className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm'
									onClick={handleNavigateToInder}>
									Continuar
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default FormPageOne;
