import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Button,
	Grid,
	Paper,
	Typography,
	FormControlLabel,
	Checkbox,
	MobileStepper,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Header from '../../components/ui/Header';
import ProgressSteps from '../../components/ui/ProgressSteps';

const FormPageDeclaracion = () => {
	const navigate = useNavigate();
	const steps = ['Modalidad', 'Solicitante', 'Representante', 'Establecimiento', 'Ubicación', 'Declaración'];
	const currentStep = 6;

	const [declarations, setDeclarations] = React.useState({
		legalRepresentative: false,
		safetyCompliance: false,
		professionalTitle: false,
	});

	const handleBack = () => navigate('/formulario/pag-ubicacion');
	// Redirige al resumen final
	const handleNext = () => navigate('/formulario/resumen');

	const handleCheckboxChange = (key) => {
		setDeclarations({ ...declarations, [key]: !declarations[key] });
	};

	return (
		<Box sx={styles.root}>
			<Header title="Trámite de Licencia" />
			<Box sx={styles.mainContainer}>
				<Grid container spacing={4} justifyContent="center">
					{/* ProgressSteps vertical solo en desktop */}
					<Grid item xs={12} md={2.5} sx={{ display: { xs: 'none', md: 'block' } }}>
						<Box sx={styles.stepperContainer}>
							<ProgressSteps 
								steps={steps} 
								currentStep={currentStep}
								onBack={handleBack}
								onNext={handleNext}
							/>
						</Box>
					</Grid>

					{/* Contenido principal */}
					<Grid item xs={12} md={7}>
						<Paper sx={styles.paper}>
							<Box sx={styles.contentHeader}>
								<Typography variant="h5" sx={styles.title}>
									Declaración Jurada
								</Typography>
								<Typography variant="body1" color="text.secondary" sx={styles.subtitle}>
									Lea atentamente y marque las declaraciones
								</Typography>
							</Box>

							<Box sx={styles.formContainer}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<Box sx={styles.sectionContainer}>
											<Typography variant="subtitle1" sx={styles.sectionTitle}>
												Declaraciones
											</Typography>
											
											<Box sx={styles.declarationContainer}>
												<FormControlLabel
													control={
														<Checkbox 
															checked={declarations.legalRepresentative} 
															onChange={() => handleCheckboxChange('legalRepresentative')} 
														/>
													}
													label={
														<Typography variant="body2">
															Cuento con poder suficiente vigente para actuar como representante legal de la persona jurídica conductora (alternativamente, de la persona natural que represento).
														</Typography>
													}
												/>
											</Box>

											<Box sx={styles.declarationContainer}>
												<FormControlLabel
													control={
														<Checkbox 
															checked={declarations.safetyCompliance} 
															onChange={() => handleCheckboxChange('safetyCompliance')} 
														/>
													}
													label={
														<Typography variant="body2">
															El establecimiento cumple con las condiciones de seguridad en edificaciones y me someto a la inspección técnica que corresponda en función al nivel de riesgo, de conformidad con la legislación aplicable.
														</Typography>
													}
												/>
											</Box>

											<Box sx={styles.declarationContainer}>
												<FormControlLabel
													control={
														<Checkbox 
															checked={declarations.professionalTitle} 
															onChange={() => handleCheckboxChange('professionalTitle')} 
														/>
													}
													label={
														<Typography variant="body2">
															Cuento con título profesional vigente y estoy habilitado por el colegio profesional correspondiente (en el caso de servicios relacionados con la salud).
														</Typography>
													}
												/>
											</Box>
										</Box>
									</Grid>
								</Grid>
							</Box>

							<Box sx={styles.navigationContainer}>
								<Button 
									variant="outlined" 
									onClick={handleBack}
									startIcon={<ArrowBack />}
								>
									Anterior
								</Button>

								{/* Mostrar MobileStepper solo en móvil */}
								<Box sx={{ display: { xs: 'block', md: 'none' } }}>
									<MobileStepper
										variant="dots"
										steps={steps.length}
										position="static"
										activeStep={currentStep - 1}
										sx={{
											backgroundColor: 'transparent',
											width: 'auto',
											px: 2,
											'& .MuiMobileStepper-dots': {
												mt: 0
											}
										}}
										backButton={null}
										nextButton={null}
									/>
								</Box>

								<Button 
									variant="contained" 
									onClick={handleNext}
									endIcon={<ArrowForward />}
								>
									Finalizar
								</Button>
							</Box>
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
		bgcolor: 'grey.100',
	},
	mainContainer: {
		p: 2,
		display: 'flex',
		flexDirection: 'column'
	},
	stepperContainer: {
		height: '100%',
		'& > *': {
			height: '100%'
		}
	},
	// Se elimina "height: '100%'" para que el contenedor se ajuste al contenido\n	paper: {\n		width: '100%',\n		borderRadius: 2,\n		overflow: 'hidden',\n		boxShadow: 3,\n		p: 2,\n		backgroundColor: 'white'\n	},
	paper: {
		width: '100%',
		borderRadius: 2,
		overflow: 'hidden',
		boxShadow: 3,
		p: 2,
		backgroundColor: 'white'
	},
	contentHeader: {
		textAlign: 'center',
		mb: 3
	},
	title: {
		textAlign: 'center',
		fontWeight: 600,
		color: '#1e293b',
	},
	subtitle: {
		textAlign: 'center',
		mt: 1,
		color: 'text.secondary'
	},
	formContainer: {
		mt: 2
	},
	sectionContainer: {
		mb: 3
	},
	sectionTitle: {
		fontWeight: 600,
		color: '#475569',
		mb: 2
	},
	declarationContainer: {
		mb: 2,
		p: 2,
		backgroundColor: '#f8fafc',
		borderRadius: 1,
		'& .MuiFormControlLabel-root': {
			margin: 0,
		},
		'& .MuiTypography-root': {
			color: '#475569',
		}
	},
	navigationContainer: {
		mt: 4,
		display: 'flex',
		justifyContent: 'space-between'
	}
};

export default FormPageDeclaracion;
