import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  InputAdornment,
  MobileStepper
} from '@mui/material';
import Header from '../../components/ui/Header';
import ProgressSteps from '../../components/ui/ProgressSteps';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const FormPageInder = () => {
	const navigate = useNavigate();
	const steps = ['Modalidad', 'Solicitante', 'Representante', 'Establecimiento', 'Ubicación', 'Declaración'];
	const currentStep = 2;

	const handleBack = () => {
		navigate('/formulario/pag-one');
	};

	const handleNext = () => {
		navigate('/formulario/pag-representante');
	};

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
									Datos del Solicitante
								</Typography>
								<Typography variant="body1" color="text.secondary" sx={styles.subtitle}>
									Complete los datos del solicitante de la licencia
								</Typography>
							</Box>

							<Box sx={styles.formContainer}>
								<Grid container spacing={1}>
									{/* RUC Section */}
									<Grid item xs={12}>
										<Box sx={styles.sectionContainer}>
											<Typography variant="subtitle1" sx={styles.sectionTitle}>
												Información de la Empresa
											</Typography>
											<TextField
												fullWidth
												label="N° RUC"
												placeholder="Ingrese su RUC"
												variant="outlined"
												size="small"
												sx={styles.textField}
											/>
										</Box>
									</Grid>

									{/* Personal Information Section */}
									<Grid item xs={12}>
										<Box sx={styles.sectionContainer}>
											<Typography variant="subtitle1" sx={styles.sectionTitle}>
												Información Personal
											</Typography>
											<Grid container spacing={2}>
												<Grid item xs={12} sm={6}>
													<TextField
														fullWidth
														label="Nombre"
														placeholder="Ingrese su nombre"
														variant="outlined"
														size="small"
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
														type="email"
														label="Correo Electrónico"
														placeholder="Ingrese su correo"
														variant="outlined"
														size="small"
														sx={styles.textField}
													/>
												</Grid>

												<Grid item xs={12} sm={6}>
													<TextField
														fullWidth
														label="N° Teléfono"
														placeholder="Ingrese su teléfono"
														variant="outlined"
														size="small"
														sx={styles.textField}
													/>
												</Grid>
											</Grid>
										</Box>
									</Grid>

									{/* Address Section */}
									<Grid item xs={12}>
										<Box sx={styles.sectionContainer}>
											<Typography variant="subtitle1" sx={styles.sectionTitle}>
												Dirección
											</Typography>
											<Grid container spacing={2}>
												<Grid item xs={12} sm={6}>
													<TextField
														fullWidth
														label="N° Int. / Mz / Lt / Otros"
														placeholder="Ingrese su dirección"
														variant="outlined"
														size="small"
														sx={styles.textField}
													/>
												</Grid>

												<Grid item xs={12} sm={6}>
													<TextField
														fullWidth
														label="Av. / Jr. / Ca. / Pje. / Otros"
														placeholder="Ingrese su dirección"
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
																		<MenuItem value="Av.">Av.</MenuItem>
																		<MenuItem value="Jr.">Jr.</MenuItem>
																		<MenuItem value="Ca.">Ca.</MenuItem>
																		<MenuItem value="Pje.">Pje.</MenuItem>
																		<MenuItem value="Otros">Otros</MenuItem>
																	</Select>
																</InputAdornment>
															),
														}}
													/>
												</Grid>

												<Grid item xs={12} sm={6}>
													<TextField
														fullWidth
														label="Urb. / AAHH. / Otros"
														placeholder="Ingrese su dirección"
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
																		<MenuItem value="Urb.">Urb.</MenuItem>
																		<MenuItem value="AAHH.">AAHH.</MenuItem>
																		<MenuItem value="Otro.">Otro.</MenuItem>
																	</Select>
																</InputAdornment>
															),
														}}
													/>
												</Grid>

												<Grid item xs={12} sm={6}>
													<FormControl fullWidth variant="outlined" sx={styles.textField} size="small">
														<InputLabel>Distrito</InputLabel>
														<Select label="Distrito" defaultValue="">
															<MenuItem value="">Seleccione un distrito</MenuItem>
														</Select>
													</FormControl>
												</Grid>

												<Grid item xs={12} sm={6}>
													<FormControl fullWidth variant="outlined" sx={styles.textField} size="small">
														<InputLabel>Provincia</InputLabel>
														<Select label="Provincia" defaultValue="">
															<MenuItem value="">Seleccione una provincia</MenuItem>
														</Select>
													</FormControl>
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
		color: '#1e293b',
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
		mb: 1,
		'&:last-child': {
			mb: 0
		}
	},
	sectionTitle: {
		color: '#2c3e50',
		fontWeight: 600,
		mb: 1,
		fontSize: '1.1rem'
	},
	textField: {
		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
			backgroundColor: '#fff',
			'&:hover .MuiOutlinedInput-notchedOutline': {
				borderColor: '#90cdf4'
			},
			'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
				borderColor: '#3182ce'
			}
		},
		'& .MuiInputLabel-root': {
			color: '#4a5568'
		}
	},
	documentTypeSelect: {
		'& .MuiSelect-select': {
			border: 'none',
			minWidth: '30px',
			padding: '2px'
		},
		'&:before, &:after': {
			display: 'none'
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

export default FormPageInder;
