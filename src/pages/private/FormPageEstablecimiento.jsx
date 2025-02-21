import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ProgressSteps from '../../components/ui/ProgressSteps';

const FormPageEstablecimiento = () => {
	const navigate = useNavigate();
	const steps = ['Modalidad', 'Solicitante', 'Representante', 'Establecimiento', 'Ubicación', 'Declaración'];
	const currentStep = 4;

	return (
		<div className='min-h-screen bg-gray-50 flex justify-center items-start sm:px-0 sm:pb-0 px-2 pb-2 pt-4'>
			<div className='w-full max-w-[900px] min-h-[550px] bg-white rounded-lg shadow-lg overflow-hidden'>
				<Header title='Trámite de Licencia' />
				<ProgressSteps steps={steps} currentStep={currentStep} />

				{/* Contenido Principal */}
				<div className='px-6 sm:px-16 py-2'>
					<h2 className='text-center text-xl sm:text-2xl font-bold mt-1 mb-3'>Datos del Establecimiento</h2>

					{/* Formulario */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2 items-end'>
						<div>
							<label className='block text-gray-700 font-medium text-sm sm:text-base'>Nombre Comercial</label>
							<input
								type='text'
								className='w-full border rounded-lg p-2 text-sm sm:text-base'
								placeholder='Ingrese el nombre comercial'
							/>
						</div>

						<div>
							<label className='block text-gray-700 font-medium text-sm sm:text-base'>Código CIIU</label>
							<input
								type='text'
								className='w-full border rounded-lg p-2 text-sm sm:text-base'
								placeholder='Ingrese el código CIIU'
							/>
						</div>

						<div>
							<label className='block text-gray-700 font-medium text-sm sm:text-base'>Giros</label>
							<select className='w-full border rounded-lg p-2 text-sm sm:text-base'>
								<option>Seleccione el giro correspondiente</option>
							</select>
						</div>

						<div>
							<label className='block text-gray-700 font-medium text-sm sm:text-base'>Actividad</label>
							<input
								type='text'
								className='w-full border rounded-lg p-2 text-sm sm:text-base'
								placeholder='Ingrese su actividad'
							/>
						</div>

						<div>
							<label className='block text-gray-700 font-medium text-sm sm:text-base'>Zonificación</label>
							<input
								type='text'
								className='w-full border rounded-lg p-2 text-sm sm:text-base'
								placeholder='(Llenado automático)'
								disabled
							/>
						</div>
					</div>

					{/* Dirección */}
					<h3 className='text-blue-600 font-semibold mt-2'>Dirección</h3>
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-2'>
						<div>
						<label className='block text-gray-700 font-medium text-sm sm:text-base '>
								Av. / Jr. / Ca. / Pje. / Otros
							</label>
							<div className="flex ">
								<select className="border rounded-l-lg rounded-r-none text-sm sm:text-base px-1 py-1 w-12">
									<option value=""> ↓ </option>
									<option value="Av.">Av.</option>
									<option value="Jr.">Jr.</option>
									<option value="Ca.">Ca.</option>
									<option value="Pje.">Pje.</option>
									<option value="Otros">Otros</option>
								</select>
								<input
									type='text'
									className='flex-1 border rounded-lg p-2 text-sm sm:text-base  rounded-l-none rounded-r-lg'
									placeholder='Ingrese su dirección'
								/>
							</div>
						</div>

						<div>
							<label className='block text-gray-700 font-medium text-sm sm:text-base'>N° Int./Mz./Lt./Otros</label>
							<input
								type='text'
								className='w-full border rounded-lg p-2 text-sm sm:text-base'
								placeholder='Ingrese el número'
							/>
						</div>

						<div>
						<label className='block text-gray-700 font-medium text-sm sm:text-base '>
								Urb. / AAHH. / Otros
							</label>
							<div className="flex ">
								<select className="border rounded-l-lg rounded-r-none text-sm sm:text-base px-1 py-1 w-12">
									<option value=""> ↓ </option>
									<option value="Urb.">Urb.</option>
									<option value="AAHH.">AAHH.</option>
									<option value="Otro.">Otro.</option>
								</select>
								<input
									type='text'
									className='flex-1 border rounded-lg p-2 text-sm sm:text-base  rounded-l-none rounded-r-lg'
									placeholder='Ingrese su dirección'
								/>
							</div>
						</div>
					</div>

					{/* Navegación */}
					<div className='flex justify-between mt-8'>
						<Button label='Anterior' variant='secondary' onClick={() => navigate('/formulario/pag-representante')} />
						<Button label='Siguiente' variant='primary' onClick={() => navigate('/formulario/pag-ubicacion')} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormPageEstablecimiento;
