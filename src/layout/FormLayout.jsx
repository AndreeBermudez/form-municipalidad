import { useLocation } from 'react-router-dom';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Header from '../features/licencia/components/layout/Header';
import StepIndicator from '../features/licencia/components/layout/StepIndicator';
import { useAuthStorage } from '../storage/authStorage';

export const FormLayout = ({ children, headerTitle, contentTitle, contentSubtitle, showSteps = true }) => {
	const location = useLocation();
	const personType = useAuthStorage((state) => state.tipoContribuyente)

	// Definir los pasos condicionalmente según el tipo de persona
	const steps =
		personType === 'juridica'
			? ['Modalidad', 'Solicitante', 'Representante', 'Establecimiento', 'Ubicación', 'Declaración']
			: ['Modalidad', 'Solicitante', 'Establecimiento', 'Ubicación', 'Declaración'];

	// Determinar el paso actual basado en la ruta
	const getCurrentStep = () => {
		const path = location.pathname;
		if (path.includes('modalidad')) return 1;
		if (path.includes('solicitante')) return 2;
		if (path.includes('representante')) return personType === 'juridica' ? 3 : null;
		if (path.includes('establecimiento')) return personType === 'juridica' ? 4 : 3;
		if (path.includes('ubicacion')) return personType === 'juridica' ? 5 : 4;
		if (path.includes('declaracion')) return personType === 'juridica' ? 6 : 5;
		return 1;
	};

	return (
		<Box sx={styles.root}>
			<Header title={headerTitle || 'Trámite de Licencia'} />
			<Box sx={styles.mainContainer}>
				<Grid container spacing={4} justifyContent='center'>
					{/* ProgressSteps vertical solo en desktop */}
					{showSteps && (
					<Grid item xs={12} md={2.5} sx={{ display: { xs: 'none', md: 'block' } }}>
						<Box sx={styles.stepperContainer}>
							<StepIndicator steps={steps} currentStep={getCurrentStep()} />
						</Box>
					</Grid>)}

					{/* Contenido principal */}
					<Grid item xs={12} md={7}>
						<Paper sx={styles.paper}>
							{(contentTitle || contentSubtitle) && (
								<Box sx={styles.contentHeader}>
									{contentTitle && (
										<Typography variant='h5' sx={styles.title}>
											{contentTitle}
										</Typography>
									)}
									{contentSubtitle && (
										<Typography variant='body1' color='text.secondary' sx={styles.subtitle}>
											{contentSubtitle}
										</Typography>
									)}
								</Box>
							)}
							{children}
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

const styles = {
	root: {
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		bgcolor: 'grey.100'
	  },
	  mainContainer: {
		flex: 1,
		p: 2,
		display: 'flex',
		flexDirection: 'column'
	  },
	  progressContainer: {
		px: { xs: 3, sm: 5 },
		py: 2,
		pb: 3
	  },
	  stepperContainer: {
		height: '100%',
		'& > *': {
		  height: '100%'
		}
	  },
	  paper: {
		width: '100%',
		borderRadius: 2,
		overflow: 'hidden',
		boxShadow: 3,
		p: 2,
		height: '100%',
		backgroundColor: 'white'
	  },
	  title: {
		textAlign: 'center',
		fontWeight: 600,
		color: '#1e293b'
	  },
	  subtitle: {
		textAlign: 'center',
		color: '#64748b'
	  },

};
