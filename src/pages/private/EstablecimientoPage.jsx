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
import { useFormStorage } from '../../storage/formStorage';

export const EstablecimientoPage = () => {
	const { currentStepIndex } = useFormNavigation();
	const updateEstablecimientoData = useFormStorage((state) => state.updateEstablecimientoData)
	const establecimientoData = useFormStorage((state) => state.establecimientoData)

	// Estado para los campos del formulario
	const [formData, setFormData] = useState({
		nombreComercial: '',
		codigoCiiu: '',
		giro: '',
		actividad: '',
		zonificacion: '',
		tipoDireccionNum : '',
		direccionNum: '',
		tipoDireccion: '',
		direccionNombre: '',
		tipoUrbanizacion: '',
		urbanizacionNombre: '',
		provincia: '',
		...establecimientoData
	});

	const handleChange = (field) => (event) => {
		const newValue = event.target.value
		setFormData({
			...formData,
			[field]: newValue,
		});
		updateEstablecimientoData({[field]: newValue})
	};

	return (
		<FormLayout
			headerTitle='Trámite de Licencia'
			contentTitle='Datos del Establecimiento'
			contentSubtitle='Complete los datos del establecimiento comercial'>
			<Box sx={styles.formContainer}>
				<Box sx={styles.scrollArea}>
					<Grid container spacing={1}>
						{/* Información del Establecimiento Section */}
						<Grid item xs={12}>
							<Box sx={styles.sectionContainer}>
								<Typography variant='subtitle1' sx={styles.sectionTitle}>
									Información del Establecimiento
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											fullWidth
											label='Nombre Comercial'
											variant='outlined'
											size='small'
											placeholder='Ingrese el nombre comercial'
											value={formData.nombreComercial}
											onChange={handleChange('nombreComercial')}
											sx={styles.textField}
										/>
									</Grid>

									{/* Primera fila: Código CIIU y Giros */}
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											label='Código CIIU'
											variant='outlined'
											size='small'
											placeholder='Ingrese el código CIIU'
											value={formData.codigoCiiu}
											onChange={handleChange('codigoCiiu')}
											sx={styles.textField}
										/>
									</Grid>

									<Grid item xs={12} sm={6}>
										<FormControl fullWidth variant='outlined' size='small' sx={styles.textField}>
											<InputLabel>Giros</InputLabel>
											<Select label='Giros' value={formData.giro} onChange={handleChange('giro')}>
												<MenuItem value=''>Seleccione el giro correspondiente</MenuItem>
												<MenuItem value='restaurante'>Restaurante</MenuItem>
												<MenuItem value='tienda'>Tienda</MenuItem>
												<MenuItem value='oficina'>Oficina</MenuItem>
												<MenuItem value='otro'>Otro</MenuItem>
											</Select>
										</FormControl>
									</Grid>

									{/* Segunda fila: Actividad y Zonificación */}
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											label='Actividad'
											variant='outlined'
											size='small'
											placeholder='Ingrese su actividad'
											value={formData.actividad}
											onChange={handleChange('actividad')}
											sx={styles.textField}
										/>
									</Grid>

									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											label='Zonificación'
											variant='outlined'
											size='small'
											placeholder='(Llenado automático)'
											disabled
											value={formData.zonificacion}
											onChange={handleChange('zonificacion')}
											sx={styles.textField}
										/>
									</Grid>
								</Grid>
							</Box>
						</Grid>

						{/* Dirección Section */}
						<Grid item xs={12}>
							<Box sx={styles.sectionContainer}>
								<Typography variant='subtitle1' sx={styles.sectionTitle}>
									Dirección
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											label='Av. / Jr. / Ca. / Pje. / Otros'
											placeholder='Nombre de la vía'
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
															value={formData.tipoDireccion}
															onChange={handleChange('tipoDireccion')}
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
											placeholder='Nombre de urbanizacion o asentamiento'
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
															value={formData.tipoUrbanizacion}
															onChange={handleChange('tipoUrbanizacion')}
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
										<TextField
											fullWidth
											label='N° Int. / Mz. / Otros'
											placeholder='Número o identificación'
											variant='outlined'
											size='small'
											value={formData.direccionNum}
											onChange={handleChange('direccionNum')}
											sx={styles.textField}
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														<Select
															variant='standard'
															value={formData.tipoDireccionNum || ''}
															onChange={handleChange('tipoDireccionNum')}
															sx={styles.documentTypeSelect}
															defaultValue=''
															size='small'>
															<MenuItem value=''>↓</MenuItem>
															<MenuItem value='N° Int.'>N° Int.</MenuItem>
															<MenuItem value='Mz Lt'>Mz Lt</MenuItem>
															<MenuItem value='Otros'>Otros</MenuItem>
														</Select>
													</InputAdornment>
												),
											}}
										/>
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
				</Box>
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
export default EstablecimientoPage;
