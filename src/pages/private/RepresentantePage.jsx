import { useState } from 'react';
import {
	Grid,
	TextField,
	Select,
	MenuItem,
	Box,
	Typography,
	InputAdornment,
	Button,
} from '@mui/material';
import { FormLayout } from '../../layout/FormLayout';
import { useFormNavigation } from '../../features/licencia/hooks/useFormNavigation';
import { FormNavigation } from '../../features/licencia/components/navigation/FormNavigation';
import { useFormStorage } from '../../storage/formStorage';

import {
	validateDNI,
	validateCE,
	validateName,
	validatePartidaElectronica,
} from '../../features/licencia/components/utils/validations';

export const RepresentantePage = () => {
	const { currentStepIndex } = useFormNavigation();
	const updateRepresentanteData = useFormStorage((state) => state.updateRepresentanteData);
	const representanteData = useFormStorage((state) => state.representanteData);
	// Se obtiene también la data del solicitante (almacenada globalmente)
	const solicitanteData = useFormStorage((state) => state.solicitanteData);

	const [formData, setFormData] = useState({
		nombreCompleto: '',
		documentType: '',
		documentNumber: '',
		partidaElectronica: '',
		asientoInscripcion: '',
		...representanteData,
	});

	const [nameError, setNameError] = useState("");
	const [documentError, setDocumentError] = useState("");
	const [partidaError, setPartidaError] = useState("");

	const handleChange = (field) => (event) => {
		const newValue = event.target.value;
		setFormData((prev) => ({
			...prev,
			[field]: newValue,
		}));
		updateRepresentanteData({ [field]: newValue });

		if (field === "documentNumber") {
			let errorMsg = "";
			if (formData.documentType === "DNI") {
				errorMsg = validateDNI(newValue);
			} else if (formData.documentType === "CE") {
				errorMsg = validateCE(newValue);
			}
			setDocumentError(errorMsg);
		}

		if (field === "partidaElectronica") {
			const errorMsg = validatePartidaElectronica(newValue);
			setPartidaError(errorMsg);
		}
	};

	const handleNameChange = (event) => {
		const newValue = event.target.value;
		setFormData((prev) => ({ ...prev, nombreCompleto: newValue }));
		updateRepresentanteData({ nombreCompleto: newValue });
		const errorMsg = validateName(newValue);
		setNameError(errorMsg);
	};

	const requiredFields = [
		"nombreCompleto",
		"documentType",
		"documentNumber",
		"partidaElectronica",
		"asientoInscripcion",
	];

	const isValid =
		requiredFields.every(
			(field) => formData[field] && formData[field].toString().trim() !== ""
		) &&
		nameError === "" &&
		documentError === "" &&
		partidaError === "";

	// Función para guardar el tipo de contribuyente desde la página de representante legal
	const handleGuardarTipoContribuyenteRepresentante = async () => {
		try {
			// Se construye el payload combinando datos del solicitante y del representante legal
			const payload = {
				actividadEconomica: solicitanteData.actividadEconomica || "",
				condicionContribuyente: solicitanteData.condicionContribuyente || "",
				estadoRuc: solicitanteData.estadoRuc || "",
				nombreRazonSocial: solicitanteData.razonSocial || "",
				numeroDocumento: solicitanteData.ruc || "",
				tipoDocumento: solicitanteData.tipoDocumento || formData.tipoDocumento,
				representanteLegal: formData.nombreCompleto,
				asientoRepresentanteLegal: formData.asientoInscripcion,
				dniRepresentanteLegal: formData.documentNumber,
				numPartidaRepresentanteLegal: formData.partidaElectronica,
			};
      
			console.log("Enviando tipoContribuyente desde Representante:", payload);
      
			const response = await fetch("http://localhost:8080/api/v1/authentication/create/tipoContribuyente", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(payload)
			});
      
			if (!response.ok) {
				const errorText = await response.text();
				console.error("Error al crear tipoContribuyente:", errorText);
				throw new Error("No se pudo crear el tipoContribuyente");
			}
      
			const result = await response.json();
			console.log("Creación exitosa desde Representante:", result);
			alert("Tipo de Contribuyente creado con éxito");
		} catch (error) {
			console.error("Error en guardarTipoContribuyente desde Representante:", error);
			alert("Error al guardar el tipo de contribuyente");
		}
	};

	return (
		<FormLayout
			headerTitle="Trámite de Licencia"
			contentTitle="Representante Legal"
			contentSubtitle="Complete los datos del representante legal"
		>
			<Box sx={styles.formContainer}>
				<Grid container spacing={1}>
					{/* Información Personal Section */}
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
										value={formData.nombreCompleto}
										onChange={handleNameChange}
										sx={styles.textField}
										error={Boolean(nameError)}
										helperText={nameError}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label="N° DNI / CE"
										placeholder="Ingrese número"
										variant="outlined"
										size="small"
										value={formData.documentNumber}
										onChange={handleChange("documentNumber")}
										sx={styles.textField}
										error={Boolean(documentError)}
										helperText={documentError}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<Select
														variant="standard"
														value={formData.documentType}
														onChange={handleChange("documentType")}
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
											inputProps: {
												maxLength:
													formData.documentType === "DNI"
														? 8
														: formData.documentType === "CE"
															? 12
															: undefined,
											},
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
										value={formData.partidaElectronica}
										onChange={handleChange("partidaElectronica")}
										sx={styles.textField}
										error={Boolean(partidaError)}
										helperText={partidaError}
										inputProps={{ maxLength: 12 }}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										fullWidth
										label="Asiento de Inscripción Sunarp"
										variant="outlined"
										size="small"
										placeholder="Ingrese el asiento de inscripción"
										value={formData.asientoInscripcion}
										onChange={handleChange("asientoInscripcion")}
										sx={styles.textField}
									/>
								</Grid>
							</Grid>
						</Box>
					</Grid>
				</Grid>
				
				<Box sx={styles.navigationWrapper}>
					{/* Se pasa isValid para habilitar el botón "Continuar" */}
					<FormNavigation currentStepIndex={currentStepIndex} isValid={isValid} />
				</Box>
			</Box>
		</FormLayout>
	);
};

const styles = {
	formContainer: {
		p: 1,
		flex: 1,
		display: "flex",
		flexDirection: "column",
		overflowY: "auto",
	},
	sectionContainer: {
		mb: 3,
		"&:last-child": {
			mb: 0,
		},
	},
	sectionTitle: {
		color: "#2c3e50",
		fontWeight: 600,
		mb: 1,
		fontSize: "1.1rem",
	},
	textField: {
		"& .MuiOutlinedInput-root": {
			borderRadius: "8px",
			backgroundColor: "#fff",
			"&:hover .MuiOutlinedInput-notchedOutline": {
				borderColor: "#90cdf4",
			},
			"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
				borderColor: "#3182ce",
			},
		},
		"& .MuiInputLabel-root": {
			color: "#4a5568",
		},
	},
	documentTypeSelect: {
		"& .MuiSelect-select": {
			border: "none",
			minWidth: "30px",
			padding: "2px",
		},
		"&:before, &:after": {
			display: "none",
		},
	},
	navigationWrapper: {
		mt: "auto",
		pt: 2,
		pb: 1,
		px: 1,
		backgroundColor: "white",
	},
};

export default RepresentantePage;
