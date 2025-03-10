import { useState } from 'react';
import { Grid, TextField, Select, MenuItem, Box, Typography, InputAdornment } from '@mui/material';
import { FormLayout } from '../../layout/FormLayout';
import { useFormNavigation } from '../../features/licencia/hooks/useFormNavigation';
import { FormNavigation } from '../../features/licencia/components/navigation/FormNavigation';
import { useFormStorage } from '../../storage/formStorage';

export const RepresentantePage = () => {
	const { currentStepIndex } = useFormNavigation();
	const updateRepresentanteData = useFormStorage((state) => state.updateRepresentanteData);
	const representanteData = useFormStorage((state) => state.representanteData);

	// Estado para los campos del formulario
	const [formData, setFormData] = useState({
		nombreCompleto: '',
		documentType: '',
		documentNumber: '',
		partidaElectronica: '',
		asientoInscripcion: '',
		...representanteData
	});

	const handleChange = (field) => (event) => {
		const newValue = event.target.value
		setFormData({
			...formData,
			[field]: newValue,
		});
		updateRepresentanteData({[field]:newValue})
	};

	return (
		<FormLayout
			headerTitle='Trámite de Licencia'
			contentTitle='Representante Legal'
			contentSubtitle='Complete los datos del representante legal'>
			<Box sx={styles.formContainer}>
				<Grid container spacing={1}>
					{/* Información Personal Section */}
					<Grid item xs={12}>
						<Box sx={styles.sectionContainer}>
							<Typography variant='subtitle1' sx={styles.sectionTitle}>
								Información Personal
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										fullWidth
										label='Apellidos y Nombres'
										variant='outlined'
										size='small'
										placeholder='Ingrese el nombre del representante'
										value={formData.nombreCompleto}
										onChange={handleChange('nombreCompleto')}
										sx={styles.textField}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label='N° DNI / CE'
										placeholder='Ingrese número'
										variant='outlined'
										size='small'
										value={formData.documentNumber}
										onChange={handleChange('documentNumber')}
										sx={styles.textField}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<Select
														variant='standard'
														value={formData.documentType}
														onChange={handleChange('documentType')}
														sx={styles.documentTypeSelect}
														defaultValue=''
														size='small'>
														<MenuItem value=''>↓</MenuItem>
														<MenuItem value='DNI'>DNI</MenuItem>
														<MenuItem value='CE'>CE</MenuItem>
													</Select>
												</InputAdornment>
											),
										}}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label='N° de partida electrónica'
										variant='outlined'
										size='small'
										placeholder='Ingrese el número de partida'
										value={formData.partidaElectronica}
										onChange={handleChange('partidaElectronica')}
										sx={styles.textField}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label='Asiento de Inscripción Sunarp'
										variant='outlined'
										size='small'
										placeholder='Ingrese el asiento de inscripción'
										value={formData.asientoInscripcion}
										onChange={handleChange('asientoInscripcion')}
										sx={styles.textField}
									/>
								</Grid>
							</Grid>
						</Box>
					</Grid>
				</Grid>
				<Box sx={styles.navigationWrapper}>
					<FormNavigation currentStepIndex={currentStepIndex} />
				</Box>
			</Box>
		</FormLayout>
	);
};

const styles = {
	formContainer: {
		p: 1,
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		overflowY: 'auto',
	},
	sectionContainer: {
		mb: 3,
		'&:last-child': {
			mb: 0,
		},
	},
	sectionTitle: {
		color: '#2c3e50',
		fontWeight: 600,
		mb: 1,
		fontSize: '1.1rem',
	},
	textField: {
		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
			backgroundColor: '#fff',
			'&:hover .MuiOutlinedInput-notchedOutline': {
				borderColor: '#90cdf4',
			},
			'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
				borderColor: '#3182ce',
			},
		},
		'& .MuiInputLabel-root': {
			color: '#4a5568',
		},
	},
	documentTypeSelect: {
		'& .MuiSelect-select': {
			border: 'none',
			minWidth: '30px',
			padding: '2px',
		},
		'&:before, &:after': {
			display: 'none',
		},
	},
	navigationWrapper: {
		marginTop: 'auto',
		paddingTop: 4,
	},
};

export default RepresentantePage;
