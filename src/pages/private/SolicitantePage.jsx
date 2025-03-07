import { useState } from 'react';
import {
	Grid,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Box,
	Typography,
	InputAdornment,
} from '@mui/material';
import { FormLayout } from '../../layout/FormLayout';
import { useFormNavigation } from '../../features/licencia/hooks/useFormNavigation';
import { FormNavigation } from '../../features/licencia/components/navigation/FormNavigation';

export const SolicitantePage = () => {
	const { currentStepIndex } = useFormNavigation();

	// Estado para los campos del formulario
	const [formData, setFormData] = useState({
		ruc: '',
		nombre: '',
		documentType: '',
		documentNumber: '',
		email: '',
		telefono: '',
		direccionNum: '',
		direccionTipo: '',
		direccionNombre: '',
		urbanizacionTipo: '',
		urbanizacionNombre: '',
		distrito: '',
		provincia: '',
	});

	const handleChange = (field) => (event) => {
		setFormData({
			...formData,
			[field]: event.target.value,
		});
	};

	return (
		<FormLayout
			headerTitle='Trámite de Licencia'
			contentTitle='Datos del Solicitante'
			contentSubtitle='Complete los datos del solicitante de la licencia'>
			<Box sx={styles.formContainer} >
				<Grid container spacing={1}>
					{/* RUC Section */}
					<Grid item xs={12}>
						<Box sx={styles.sectionContainer}>
							<Typography variant='subtitle1' sx={styles.sectionTitle}>
								Información de la Empresa
							</Typography>
							<TextField
								fullWidth
								label='N° RUC'
								placeholder='Ingrese su RUC'
								variant='outlined'
								size='small'
								value={formData.ruc}
								onChange={handleChange('ruc')}
								sx={styles.textField}
							/>
						</Box>
					</Grid>

					{/* Personal Information Section */}
					<Grid item xs={12}>
						<Box sx={styles.sectionContainer}>
							<Typography variant='subtitle1' sx={styles.sectionTitle}>
								Información Personal
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label='Nombre'
										placeholder='Ingrese su nombre'
										variant='outlined'
										size='small'
										value={formData.nombre}
										onChange={handleChange('nombre')}
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
										type='email'
										label='Correo Electrónico'
										placeholder='Ingrese su correo'
										variant='outlined'
										size='small'
										value={formData.email}
										onChange={handleChange('email')}
										sx={styles.textField}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label='N° Teléfono'
										placeholder='Ingrese su teléfono'
										variant='outlined'
										size='small'
										value={formData.telefono}
										onChange={handleChange('telefono')}
										sx={styles.textField}
									/>
								</Grid>
							</Grid>
						</Box>
					</Grid>

					{/* Address Section */}
					<Grid item xs={12}>
						<Box sx={styles.sectionContainer}>
							<Typography variant='subtitle1' sx={styles.sectionTitle}>
								Dirección
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label='N° Int. / Mz / Lt / Otros'
										placeholder='Ingrese su dirección'
										variant='outlined'
										size='small'
										value={formData.direccionNum}
										onChange={handleChange('direccionNum')}
										sx={styles.textField}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label='Av. / Jr. / Ca. / Pje. / Otros'
										placeholder='Ingrese su dirección'
										variant='outlined'
										size='small'
										value={formData.direccionNombre}
										onChange={handleChange('direccionNombre')}
										sx={styles.textField}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<Select
														variant='standard'
														value={formData.direccionTipo}
														onChange={handleChange('direccionTipo')}
														sx={styles.documentTypeSelect}
														defaultValue=''
														size='small'>
														<MenuItem value=''>↓</MenuItem>
														<MenuItem value='Av.'>Av.</MenuItem>
														<MenuItem value='Jr.'>Jr.</MenuItem>
														<MenuItem value='Ca.'>Ca.</MenuItem>
														<MenuItem value='Pje.'>Pje.</MenuItem>
														<MenuItem value='Otros'>Otros</MenuItem>
													</Select>
												</InputAdornment>
											),
										}}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label='Urb. / AAHH. / Otros'
										placeholder='Ingrese su dirección'
										variant='outlined'
										size='small'
										value={formData.urbanizacionNombre}
										onChange={handleChange('urbanizacionNombre')}
										sx={styles.textField}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<Select
														variant='standard'
														value={formData.urbanizacionTipo}
														onChange={handleChange('urbanizacionTipo')}
														sx={styles.documentTypeSelect}
														defaultValue=''
														size='small'>
														<MenuItem value=''>↓</MenuItem>
														<MenuItem value='Urb.'>Urb.</MenuItem>
														<MenuItem value='AAHH.'>AAHH.</MenuItem>
														<MenuItem value='Otro.'>Otro.</MenuItem>
													</Select>
												</InputAdornment>
											),
										}}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<FormControl fullWidth variant='outlined' sx={styles.textField} size='small'>
										<InputLabel>Distrito</InputLabel>
										<Select label='Distrito' value={formData.distrito} onChange={handleChange('distrito')}>
											<MenuItem value=''>Seleccione un distrito</MenuItem>
											<MenuItem value='NuevoChimbote'>Nuevo Chimbote</MenuItem>
											<MenuItem value='Chimbote'>Chimbote</MenuItem>
										</Select>
									</FormControl>
								</Grid>

								<Grid item xs={12} sm={6}>
									<FormControl fullWidth variant='outlined' sx={styles.textField} size='small'>
										<InputLabel>Provincia</InputLabel>
										<Select label='Provincia' value={formData.provincia} onChange={handleChange('provincia')}>
											<MenuItem value=''>Seleccione una provincia</MenuItem>
											<MenuItem value='Santa'>Santa</MenuItem>
										</Select>
									</FormControl>
								</Grid>
							</Grid>
						</Box>
					</Grid>
				</Grid>
				<FormNavigation currentStepIndex={currentStepIndex} />
			</Box>
		</FormLayout>
	);
};

const styles = {
	formContainer: {
		p: 1,
		flex: 1,
		overflowY: 'auto',
	},
	sectionContainer: {
		mb: 1,
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
	navigationContainer: {
		p: 2,
		pt: 2,
		mt: 'auto',
		display: 'flex',
		justifyContent: 'space-between',
	},
};

export default SolicitantePage;
