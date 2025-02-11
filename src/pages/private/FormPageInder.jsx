import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import ProgressSteps from '../../components/ui/ProgressSteps';

const FormPageInder = () => {
	const navigate = useNavigate();
	const steps = ['Modalidad', 'Solicitante', 'Representante', 'Establecimiento', 'Ubicación', 'Declaración'];
	const currentStep = 2;

	return (
		<div className='min-h-screen bg-gray-50 flex justify-center items-start p-2 sm:p-0'>
			<div className='w-full max-w-[900px] bg-white rounded-lg shadow-lg overflow-hidden mt-3'>
				<Header title='Trámite de Licencia' />
				<ProgressSteps steps={steps} currentStep={currentStep} />

				{/* Contenido principal */}
				<div className='px-6 sm:px-16 py-3'>
					<h2 className='text-center text-lg sm:text-2xl font-bold mt-1 mb-3'>Licencia de Funcionamiento</h2>

					{/* Formulario */}
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2'>
						<div className='sm:col-span-3'>
							<label className='block text-gray-700 font-medium text-sm sm:text-base'>
								N° RUC
							</label>
							<input
								type='text'
								className='w-full border rounded-lg p-2 text-sm sm:text-base'
								placeholder='Ingrese su RUC'
							/>
						</div>

						<div>
							<label className='block text-gray-700 font-medium text-sm sm:text-base'>Nombre</label>
							<input
								type='text'
								className='w-full border rounded-lg p-2 text-sm sm:text-base'
								placeholder='Ingrese su nombre'
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
							<label className='block text-gray-700 font-medium text-sm sm:text-base'>Correo Electrónico</label>
							<input
								type='email'
								className='w-full border rounded-lg p-2 text-sm sm:text-base'
								placeholder='Ingrese su correo'
							/>
						</div>

						<div>
							<label className='block text-gray-700 font-medium text-sm sm:text-base'>N° Teléfono</label>
							<input
								type='text'
								className='w-full border rounded-lg p-2 text-sm sm:text-base'
								placeholder='Ingrese su teléfono'
							/>
						</div>

						<div>
							<label className='block text-gray-700 font-medium text-sm sm:text-base'>
								N° Int. / Mz / Lt / Otros
							</label>
							<input
								type='text'
								className='w-full border rounded-lg p-2 text-sm sm:text-base'
								placeholder='Ingrese su dirección'
							/>
						</div>

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

						<div>
							<label className='block text-gray-700 font-medium text-sm sm:text-base'>Distrito</label>
							<select className='w-full border rounded-lg p-2 text-sm sm:text-base'>
								<option>Seleccione un distrito</option>
							</select>
						</div>

						<div>
							<label className='block text-gray-700 font-medium text-sm sm:text-base'>Provincia</label>
							<select className='w-full border rounded-lg p-2 text-sm sm:text-base'>
								<option>Seleccione una provincia</option>
							</select>
						</div>
					</div>

					{/* Navegación */}
					<div className='flex justify-between mt-6'>
						<Button label='Anterior' variant='secondary' onClick={() => navigate('/formulario/pag-one')} />
						<Button label='Continuar' variant='primary' onClick={() => navigate('/formulario/pag-representante')} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormPageInder;
