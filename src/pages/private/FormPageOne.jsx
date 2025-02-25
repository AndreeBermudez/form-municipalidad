import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Button, 
  Modal,
  Card,
  CardMedia,
  CardContent,
  TextField
} from '@mui/material';
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

	const handleSalir = () => {
		navigate('/inicio');
	};

	const handleNext = () => {
		navigate('/formulario/pag-solicitante');
	};

	const handleBack = () => {
		navigate('/inicio');
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
									Licencia de Funcionamiento
								</Typography>
								<Typography variant="body1" color="text.secondary" sx={styles.subtitle}>
									Seleccione una opción según el tipo de licencia que desea solicitar.
								</Typography>
							</Box>

							<Box sx={styles.cardsContainer}>
								<Grid container spacing={3}>
									{/* Card de Indeterminada */}
									<Grid item xs={12} sm={6}>
										<Card sx={styles.card} onClick={handleNavigateToInder}>
											<CardMedia
												component="img"
												height="200"
												image={indeterminadaImg}
												alt="Indeterminada"
												sx={styles.cardMedia}
											/>
											<CardContent sx={styles.cardContent}>
												<Typography variant="h6" sx={styles.cardTitle}>
													Indeterminada
												</Typography>
												<Typography variant="body2" color="text.secondary">
													Autorización para actividades económicas en un establecimiento determinado.
												</Typography>
											</CardContent>
										</Card>
									</Grid>

									{/* Card de Temporal con Modal */}
									<Grid item xs={12} sm={6}>
										<Card sx={styles.card} onClick={() => setShowModal(true)}>
											<CardMedia
												component="img"
												height="200"
												image={temporalImg}
												alt="Temporal"
												sx={styles.cardMedia}
											/>
											<CardContent sx={styles.cardContent}>
												<Typography variant="h6" sx={styles.cardTitle}>
													Temporal
												</Typography>
												<Typography variant="body2" color="text.secondary">
													Autorización por un periodo determinado.
												</Typography>
											</CardContent>
										</Card>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Box>

			{/* Modal para seleccionar fechas */}
			<Modal
				open={showModal}
				onClose={() => setShowModal(false)}
				sx={styles.modal}
			>
				<Paper sx={styles.modalContent}>
					<Typography variant="h6" sx={styles.modalTitle}>
						Licencia Temporal
					</Typography>
					<Typography variant="body2" sx={styles.modalSubtitle}>
						Seleccione la fecha de inicio y fin.
					</Typography>

					<Box sx={styles.dateFieldsContainer}>
						<TextField
							fullWidth
							label="Desde"
							type="date"
							value={dates.from}
							onChange={(e) => setDates({ ...dates, from: e.target.value })}
							InputLabelProps={{ shrink: true }}
						/>
						<TextField
							fullWidth
							label="Hasta"
							type="date"
							value={dates.to}
							onChange={(e) => setDates({ ...dates, to: e.target.value })}
							InputLabelProps={{ shrink: true }}
						/>
					</Box>

					<Box sx={styles.modalButtons}>
						<Button
							variant="contained"
							color="inherit"
							onClick={() => setShowModal(false)}
						>
							Cancelar
						</Button>
						<Button
							variant="contained"
							color="success"
							onClick={handleNavigateToInder}
						>
							Continuar
						</Button>
					</Box>
				</Paper>
			</Modal>
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
		p: 3,
		display: 'flex',
		flexDirection: 'column'
	},
	stepperContainer: {
		height: '100%',
		'& > *': {
		  height: '100%'
		}
	  },
	paper: {
		width: '100%',
		borderRadius: '12px',
		overflow: 'hidden',
		boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
		p: 0,
		height: '100%',
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'column'
	},
	contentHeader: {
		p: 4,
		pb: 3,
		backgroundColor: '#f8f9fa',
		borderBottom: '1px solid #edf2f7'
	},
	title: {
		textAlign: 'center',
		fontWeight: 700,
		color: '#2c3e50',
		mb: 1
	},
	subtitle: {
		textAlign: 'center',
		color: '#64748b',
		px: 2
	},
	cardsContainer: {
		p: 4,
		flex: 1
	},
	card: {
		height: '100%',
		cursor: 'pointer',
		transition: 'all 0.3s ease-in-out',
		borderRadius: '12px',
		overflow: 'hidden',
		boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
		'&:hover': {
			transform: 'translateY(-4px)',
			boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
		}
	},
	cardMedia: {
		height: 200,
		objectFit: 'cover'
	},
	cardContent: {
		p: 3
	},
	cardTitle: {
		fontWeight: 600,
		mb: 1,
		color: '#2c3e50'
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		p: 2
	},
	modalContent: {
		position: 'relative',
		width: '100%',
		maxWidth: 500,
		p: 4,
		borderRadius: '12px',
		backgroundColor: 'white',
		boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
		outline: 'none'
	},
	modalTitle: {
		mb: 2,
		fontWeight: 700,
		color: '#2c3e50'
	},
	modalSubtitle: {
		mb: 3,
		color: '#64748b'
	},
	dateFieldsContainer: {
		display: 'flex',
		flexDirection: 'column',
		gap: 3,
		mb: 3
	},
	modalButtons: {
		display: 'flex',
		justifyContent: 'space-between',
		mt: 3
	},
	exitButtonContainer: {
		p: 4,
		pt: 0,
		mt: 'auto',
		borderTop: '1px solid #edf2f7',
		display: 'flex',
		justifyContent: 'flex-end'
	},
	exitButton: {
		px: 4
	}
};

export default FormPageOne;
