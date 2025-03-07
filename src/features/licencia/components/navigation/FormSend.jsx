import { Box, MobileStepper } from '@mui/material';
import { useAuthStorage } from '../../../../storage/authStorage';
import { useFormNavigation } from '../../hooks/useFormNavigation';

export const FormSend = ({ currentStepIndex,handleSubmit }) => {
	const { goToPrevious } = useFormNavigation();
	const tipoContribuyente = useAuthStorage((state) => state.tipoContribuyente) || 'juridica';

	const steps =
		tipoContribuyente === 'juridica'
			? ['Modalidad', 'Solicitante', 'Representante', 'Establecimiento', 'Ubicación', 'Declaración', 'Resumen']
			: ['Modalidad', 'Solicitante', 'Establecimiento', 'Ubicación', 'Declaración', 'Resumen'];

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				mt: 'auto',
				pt: 3,
			}}>
			<button
				onClick={goToPrevious}
				className='px-5 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'>
				Anterior
			</button>
			<Box sx={{ display: { xs: 'block', md: 'none' } }}>
				<MobileStepper
					variant='dots'
					steps={steps.length}
					position='static'
					activeStep={currentStepIndex}
					sx={{
						backgroundColor: 'transparent',
						width: 'auto',
						px: 2,
						'& .MuiMobileStepper-dots': {
							mt: 0,
						},
					}}
					backButton={null}
					nextButton={null}
				/>
			</Box>
			<button
				onClick={handleSubmit}
				className='px-5 py-2 bg-green-600 border border-transparent rounded-md text-white hover:bg-green-700'>
				Enviar Formulario
			</button>
		</Box>
	);
};
