import { useState } from 'react';
import { Grid, Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { FormLayout } from '../../layout/FormLayout';
import { useFormNavigation } from '../../features/licencia/hooks/useFormNavigation';
import { FormNavigation } from '../../features/licencia/components/navigation/FormNavigation';
import { useFormStorage } from '../../storage/formStorage';

export const DeclaracionPage = () => {
	const { currentStepIndex } = useFormNavigation();
	const declaracionData = useFormStorage((state) => state.declaracionData);
	const updateDeclaracionData = useFormStorage((state) => state.updateDeclaracionData);

	const [declarations, setDeclarations] = useState({
		legalRepresentative: false,
		safetyCompliance: false,
		professionalTitle: false,
	});

	const handleCheckboxChange = (key) => {
		const newDeclarations = {
			...declarations,
			[key]: !declarations[key],
		};
		setDeclarations(newDeclarations);
		const puntosDeclaracion = [];
		if (newDeclarations.legalRepresentative) puntosDeclaracion.push(1);
		if (newDeclarations.safetyCompliance) puntosDeclaracion.push(2);
		if (newDeclarations.professionalTitle) puntosDeclaracion.push(3);
    updateDeclaracionData({ puntosDeclaracion });
	};

	return (
		<FormLayout
			headerTitle='Trámite de Licencia'
			contentTitle='Declaración Jurada'
			contentSubtitle='Lea atentamente y marque las declaraciones'>
			<Box sx={styles.formContainer}>
				<Box sx={styles.scrollArea}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Box sx={styles.sectionContainer}>
								<Typography variant='subtitle1' sx={styles.sectionTitle}>
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
											<Typography variant='body2' sx={styles.declarationText}>
												Cuento con poder suficiente vigente para actuar como representante legal de la persona
												jurídica conductora (alternativamente, de la persona natural que represento).
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
											<Typography variant='body2' sx={styles.declarationText}>
												El establecimiento cumple con las condiciones de seguridad en edificaciones y me someto a
												la inspección técnica que corresponda en función al nivel de riesgo, de conformidad con la
												legislación aplicable.
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
											<Typography variant='body2' sx={styles.declarationText}>
												Cuento con título profesional vigente y estoy habilitado por el colegio profesional
												correspondiente (en el caso de servicios relacionados con la salud).
											</Typography>
										}
									/>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Box>

				<Box sx={styles.navigationWrapper}>
					<FormNavigation currentStepIndex={currentStepIndex} nextButtonText='Finalizar' />
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
	declarationContainer: {
		mb: 2,
		p: 2,
		backgroundColor: '#f8fafc',
		borderRadius: 2,
		'& .MuiFormControlLabel-root': {
			margin: 0,
			alignItems: 'flex-start',
			'& .MuiCheckbox-root': {
				paddingTop: 0,
			},
		},
	},
	declarationText: {
		color: '#475569',
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
};

export default DeclaracionPage;
