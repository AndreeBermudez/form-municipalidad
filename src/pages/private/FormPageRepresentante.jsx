import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ProgressSteps from '../../components/ui/ProgressSteps';

const FormPageRepresentante = () => {
	const navigate = useNavigate();
	const steps = ['Modalidad', 'Solicitante', 'Representante', 'Establecimiento', 'Ubicación', 'Declaración'];
	const currentStep = 3;

	return (
		<div className='min-h-screen bg-gray-50 flex justify-center items-start sm:px-0 sm:pb-0 px-2 pb-6 pt-4'>
			<div className='w-full max-w-[900px] min-h-[600px] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col'>
				<Header title='Trámite de Licencia' />
				<ProgressSteps steps={steps} currentStep={currentStep} />

				<div className='px-6 sm:px-16 py-2 flex-grow'>
					<h2 className='text-center text-xl sm:text-2xl font-bold mt-1 mb-3'>Representante Legal</h2>

					{/* Formulario */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-end'>
						<div className='sm:col-span-2'>
							<label className='block text-gray-700 font-medium text-sm sm:text-base'>Apellidos y Nombres</label>
							<input
								type='text'
								className='w-full border rounded-lg p-2 text-sm sm:text-base'
								placeholder='Ingrese el nombre del representante'
							/>
						</div>

						<div>
						<label className='block text-gray-700 font-medium text-sm sm:text-base '>
								N° DNI / CE
							</label>
							<div className="flex ">
								<select className="border rounded-l-lg rounded-r-none text-sm sm:text-base px-1 py-1 w-12">
									<option value=""> ↓ </option>
									<option value="DNI">DNI</option>
									<option value="CE">CE</option>
								</select>
								<input
									type='text'
									className='flex-1 border rounded-lg p-2 text-sm sm:text-base  rounded-l-none rounded-r-lg'
									placeholder='Ingrese numero'
								/>
							</div>
						</div>

						<div>
							<label className='block text-gray-700 font-medium text-sm sm:text-base'>
								N° de partida electrónica y Asiento de Inscripción Sunarp
								<span className='text-red-600 font-bold'> ¿Qué es?</span>
							</label>
							<input
								type='text'
								className='w-full border rounded-lg p-2 text-sm sm:text-base'
								placeholder='Ingrese el número de partida'
							/>
						</div>
					</div>
				</div>

				{/* Botones de navegación FUERA del contenido principal */}
				<div className='px-6 sm:px-16 py-4 flex justify-between'>
					<Button label='Anterior' variant='secondary' onClick={() => navigate('/formulario/pag-inder')} />
					<Button label='Siguiente' variant='primary' onClick={() => navigate('/formulario/pag-establecimiento')} />
				</div>
			</div>
		</div>
	);
};

export default FormPageRepresentante;
