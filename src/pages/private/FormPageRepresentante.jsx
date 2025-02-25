import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Container, 
  Paper, 
  Typography, 
  Grid, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Box,
  Button,
  Link,
  InputAdornment,
  MobileStepper
} from '@mui/material';
import Header from '../../components/ui/Header';
import ProgressSteps from '../../components/ui/ProgressSteps';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const FormPageRepresentante = () => {
	const navigate = useNavigate();
	const steps = ['Modalidad', 'Solicitante', 'Representante', 'Establecimiento', 'Ubicación', 'Declaración'];
	const currentStep = 3;

	const handleBack = () => navigate('/formulario/pag-inder');
	const handleNext = () => navigate('/formulario/pag-establecimiento');

	return (
		<Box sx={styles.root}>
			<Header title='Trámite de Licencia' />
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
									Representante Legal
								</Typography>
								<Typography variant="body1" color="text.secondary" sx={styles.subtitle}>
									Complete los datos del representante legal
								</Typography>
							</Box>

							<Box sx={styles.formContainer}>
								<Grid container spacing={1}>
									<Grid item xs={12}>
										<Box sx={styles.sectionContainer}>
											<Typography variant="subtitle1" sx={styles.sectionTitle}>
												Información Personal
											</Typography>
											<Grid container spacing={2}>
												<Grid item xs={12}>
													<TextField
														fullWidth
														label="Apellidos y Nombres"
														variant="outlined"
														size="small"
														placeholder="Ingrese el nombre del representante"
														sx={styles.textField}
													/>
												</Grid>

												<Grid item xs={12} sm={6}>
													<TextField
														fullWidth
														label="N° DNI / CE"
														placeholder="Ingrese número"
														variant="outlined"
														size="small"
														sx={styles.textField}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<Select
																		variant="standard"
																		sx={styles.documentTypeSelect}
																		defaultValue=""
																		size="small"
																	>
																		<MenuItem value="">↓</MenuItem>
																		<MenuItem value="DNI">DNI</MenuItem>
																		<MenuItem value="CE">CE</MenuItem>
																	</Select>
																</InputAdornment>
															),
														}}
													/>
												</Grid>

												<Grid item xs={12} sm={6}>
													<TextField
														fullWidth
														label="N° de partida electrónica"
														variant="outlined"
														size="small"
														placeholder="Ingrese el número de partida"
														sx={styles.textField}
														helperText={
															<Box component="span">
																Asiento de Inscripción Sunarp
																<Link sx={styles.helpLink} href="#" target="_blank">
																	¿Qué es?
																</Link>
															</Box>
														}
													/>
												</Grid>
											</Grid>
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
									Continuar
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
	// Se eliminó "height: '100%'" para que el contenedor se ajuste al contenido
	paper: {
		width: '100%',
		borderRadius: 2,
		overflow: 'hidden',
		boxShadow: 3,
		p: 2,
		backgroundColor: 'white'
	},
	contentContainer: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		p: 3
	},
	contentHeader: {
		textAlign: 'center',
		mb: 3
	},
	title: {
		fontWeight: 600,
		color: '#1e293b'
	},
	subtitle: {
		textAlign: 'center',
		color: '#64748b',
	},
	formContainer: {
		p: 1,
		flex: 1,
		overflowY: 'auto'
	},
	sectionContainer: {
		mb: 3
	},
	sectionTitle: {
		color: '#2c3e50',
		fontWeight: 600,
		mb: 1,
		fontSize: '1.1rem'
	},
	textField: {
		backgroundColor: '#fff'
	},
	documentTypeSelect: {
		'& .MuiSelect-select': {
			py: 0
		},
		'&:before, &:after': {
			display: 'none'
		},
		width: 70
	},
	helpLink: {
		ml: 1,
		fontWeight: 'bold',
		color: 'error.main',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline'
		}
	},
	navigationContainer: {
		p: 2,
		pt: 2,
		mt: 'auto',
		display: 'flex',
		justifyContent: 'space-between'
	}
};

export default FormPageRepresentante;
