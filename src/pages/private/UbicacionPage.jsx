import { Box, Grid, TextField, Typography } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { FormNavigation } from '../../features/licencia/components/navigation/FormNavigation';
import { useFormNavigation } from '../../features/licencia/hooks/useFormNavigation';
import { FormLayout } from '../../layout/FormLayout';

export const UbicacionPage = () => {
	const { currentStepIndex } = useFormNavigation();
	const [position] = useState([-9.085594, -78.578593]); // Posición inicial del mapa
	const [address, setAddress] = useState('');
	const [area, setArea] = useState('');

	const handleAreaChange = (e) => {
		setArea(e.target.value);
	};

	return (
		<FormLayout
			headerTitle='Trámite de Licencia'
			contentTitle='Croquis de la ubicación'
			contentSubtitle='Selecciona la ubicación del establecimiento'>
			<Box sx={styles.formContainer}>
				<Box sx={styles.scrollArea}>
					<Grid container spacing={1}>
						{/* Mapa */}
						<Grid item xs={12}>
							<Box sx={styles.sectionContainer}>
								<MapContainer center={position} zoom={15} style={styles.mapContainer} scrollWheelZoom={false}>
									<TileLayer
										attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
										url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
									/>
									<Marker position={position}>
										<Popup>Ubicación del establecimiento</Popup>
									</Marker>
								</MapContainer>
							</Box>
						</Grid>

						{/* Dirección seleccionada (oculto por ahora) */}
						<Grid item xs={12}>
							<Box sx={{ ...styles.sectionContainer, display: 'none' }}>
								<Typography variant='subtitle1' sx={styles.sectionTitle}>
									📍 Dirección Seleccionada
								</Typography>
								<TextField
									fullWidth
									value={address}
									InputProps={{
										readOnly: true,
									}}
									variant='outlined'
									size='small'
									sx={styles.textField}
								/>
							</Box>
						</Grid>

						{/* Área total */}
						<Grid item xs={12}>
							<Box sx={styles.sectionContainer}>
								<Typography variant='subtitle1' sx={styles.sectionTitle}>
									Área total solicitada (m²)
								</Typography>
								<TextField
									fullWidth
									type='number'
									placeholder='Ingrese el área total en m²'
									variant='outlined'
									size='small'
									value={area}
									onChange={handleAreaChange}
									sx={styles.textField}
								/>
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
	mapContainer: {
		width: '100%',
		height: '280px',
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

export default UbicacionPage;
