import { Box, Divider, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { FormSend } from '../../features/licencia/components/navigation/FormSend';
import { useFormNavigation } from '../../features/licencia/hooks/useFormNavigation';
import { FormLayout } from '../../layout/FormLayout';
import { useAuthStorage } from '../../storage/authStorage';
import { useFormStorage } from '../../storage/formStorage';

export const ResumenPage = () => {
	const { currentStepIndex } = useFormNavigation();
	const tipoContribuyente = useAuthStorage((state) => state.tipoContribuyente) || 'juridica';
	const tipoLicenciaData = useFormStorage((state) => state.tipoLicenciaData);
	const solicitanteData = useFormStorage((state) => state.solicitanteData);
	const representanteData = useFormStorage((state) => state.representanteData);
	const establecimientoData = useFormStorage((state) => state.establecimientoData);
	const ubicacionData = useFormStorage((state) => state.ubicacionData);
	const declaracionData = useFormStorage((state) => state.declaracionData);

	const direccionSolicitante = `${solicitanteData.tipoDireccion} ${solicitanteData.direccionNombre} ${solicitanteData.tipoDireccionNum} ${solicitanteData.direccionNum}, ${solicitanteData.tipoUrbanizacion} ${solicitanteData.urbanizacionNombre}, ${solicitanteData.distrito}, ${solicitanteData.provincia}`;
	const direccionEstablecimiento = `${establecimientoData.tipoDireccion} ${establecimientoData.direccionNombre} ${establecimientoData.tipoDireccionNum} ${establecimientoData.direccionNum}, ${establecimientoData.tipoUrbanizacion} ${establecimientoData.urbanizacionNombre},  ${solicitanteData.provincia}`;
	
	const formData = {
		modalidad: tipoLicenciaData.tipo,
		ruc: solicitanteData.ruc,
		nombreSolicitante: tipoContribuyente === 'juridica' 
		  ? solicitanteData.razonSocial 
		  : solicitanteData.nombre,
		dniCE: solicitanteData.documentNumber,
		correo: solicitanteData.email,
		direccionSolicitante: direccionSolicitante,
		representanteNombre: representanteData.nombreCompleto,
		representanteDni: representanteData.documentNumber,
		representantePartida: representanteData.partidaElectronica,
		representanteAsiento: representanteData.asientoInscripcion,
		nombreComercial: establecimientoData.nombreComercial,
		codigoCIIU: establecimientoData.codigoCiiu,
		giro: establecimientoData.giro,
		actividad: establecimientoData.actividad,
		direccionEstablecimiento: direccionEstablecimiento,
		areaSolicitada: ubicacionData.area,
		declaraciones: 'Todas las declaraciones han sido aceptadas',
	  };
	  
	const handleSubmit = () => {
		alert('Formulario enviado correctamente');
	};

	return (
		<FormLayout
			headerTitle='Trámite de Licencia'
			contentTitle='Resumen Final del Formulario'
			contentSubtitle='Verifique la información antes de enviar'
			showSteps={false}>
			<Box sx={styles.formContainer}>
				<Box sx={styles.scrollArea}>
					<Grid container spacing={1}>
						{/* Sección Modalidad */}
						<Grid item xs={12}>
							<Box sx={styles.sectionContainer}>
								<Typography variant='subtitle1' sx={styles.sectionTitle}>
									Modalidad
								</Typography>
								<TextField
									fullWidth
									value={formData.modalidad}
									disabled
									placeholder='Tipo de licencia seleccionada'
									variant='outlined'
									size='small'
									sx={styles.textField}
								/>
							</Box>
						</Grid>

						{/* Datos del Solicitante */}
						<Grid item xs={12}>
							<Divider sx={{ my: 2 }} />
							<Box sx={styles.sectionContainer}>
								<Typography variant='subtitle1' sx={styles.sectionTitle}>
									Datos del Solicitante
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											label='Número RUC'
											value={formData.ruc}
											disabled
											variant='outlined'
											size='small'
											sx={styles.textField}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											label='Nombre / Razón Social'
											value={formData.nombreSolicitante}
											disabled
											variant='outlined'
											size='small'
											sx={styles.textField}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											label='Número DNI/CE'
											value={formData.dniCE}
											disabled
											variant='outlined'
											size='small'
											sx={styles.textField}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											label='Correo Electrónico'
											value={formData.correo}
											disabled
											variant='outlined'
											size='small'
											sx={styles.textField}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											fullWidth
											label='Dirección'
											value={formData.direccionSolicitante}
											disabled
											variant='outlined'
											size='small'
											sx={styles.textField}
										/>
									</Grid>
								</Grid>
							</Box>
						</Grid>

						{/* Representante Legal - Solo para persona jurídica */}
						{tipoContribuyente === 'juridica' && (
							<Grid item xs={12}>
								<Divider sx={{ my: 2 }} />
								<Box sx={styles.sectionContainer}>
									<Typography variant='subtitle1' sx={styles.sectionTitle}>
										Representante Legal
									</Typography>
									<Grid container spacing={2}>
										<Grid item xs={12}>
											<TextField
												fullWidth
												label='Apellidos y Nombres'
												value={formData.representanteNombre}
												disabled
												variant='outlined'
												size='small'
												sx={styles.textField}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												fullWidth
												label='Número DNI/CE'
												value={formData.representanteDni}
												disabled
												variant='outlined'
												size='small'
												sx={styles.textField}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												fullWidth
												label='Número de partida electrónica'
												value={formData.representantePartida}
												disabled
												variant='outlined'
												size='small'
												sx={styles.textField}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												fullWidth
												label='Número de asiento de inscripción'
												value={formData.representanteAsiento}
												disabled
												variant='outlined'
												size='small'
												sx={styles.textField}
											/>
										</Grid>
									</Grid>
								</Box>
							</Grid>
						)}

						{/* Datos del Establecimiento */}
						<Grid item xs={12}>
							<Divider sx={{ my: 2 }} />
							<Box sx={styles.sectionContainer}>
								<Typography variant='subtitle1' sx={styles.sectionTitle}>
									Datos del Establecimiento
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											label='Nombre Comercial'
											value={formData.nombreComercial}
											disabled
											variant='outlined'
											size='small'
											sx={styles.textField}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											label='Código CIIU'
											value={formData.codigoCIIU}
											disabled
											variant='outlined'
											size='small'
											sx={styles.textField}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											label='Giro'
											value={formData.giro}
											disabled
											variant='outlined'
											size='small'
											sx={styles.textField}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											label='Actividad'
											value={formData.actividad}
											disabled
											variant='outlined'
											size='small'
											sx={styles.textField}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											fullWidth
											label='Dirección Establecimiento'
											value={formData.direccionEstablecimiento}
											disabled
											variant='outlined'
											size='small'
											sx={styles.textField}
										/>
									</Grid>
								</Grid>
							</Box>
						</Grid>

						{/* Ubicación del establecimiento */}
						<Grid item xs={12}>
							<Divider sx={{ my: 2 }} />
							<Box sx={styles.sectionContainer}>
								<Typography variant='subtitle1' sx={styles.sectionTitle}>
									Ubicación del Establecimiento
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											fullWidth
											label='Área total solicitada (m²)'
											value={formData.areaSolicitada}
											disabled
											variant='outlined'
											size='small'
											sx={styles.textField}
										/>
									</Grid>
								</Grid>
							</Box>
						</Grid>

						{/* Declaraciones Juradas */}
						<Grid item xs={12}>
							<Divider sx={{ my: 2 }} />
							<Box sx={styles.sectionContainer}>
								<Typography variant='subtitle1' sx={styles.sectionTitle}>
									Declaraciones Juradas
								</Typography>
								<TextField
									fullWidth
									label='Declaraciones'
									value={formData.declaraciones}
									disabled
									variant='outlined'
									size='small'
									multiline
									rows={2}
									sx={styles.textField}
								/>
							</Box>
						</Grid>
					</Grid>
				</Box>

				<Box sx={styles.navigationWrapper}>
					<FormSend currentStepIndex={currentStepIndex} handleSubmit={handleSubmit} />
				</Box>
			</Box>
		</FormLayout>
	);
};

const styles = {
	formContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	scrollArea: {
		flex: 1,
		overflowY: 'auto',
		p: 1,
	},
	navigationWrapper: {
		mt: 'auto',
		borderTop: '1px solid #e2e8f0',
		pt: 2,
		pb: 1,
		px: 1,
		backgroundColor: 'white',
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
			backgroundColor: '#f8fafc',
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
};

export default ResumenPage;
