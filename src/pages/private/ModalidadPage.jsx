import { useState } from 'react';
import { Grid } from '@mui/material';
import { FormLayout } from '../../layout/FormLayout';
import { ModalityCard } from '../../features/licencia/components/modality/ModalityCard';
import { TemporalModal } from '../../features/licencia/components/modality/TemporalModal';
import { useFormNavigation } from '../../features/licencia/hooks/useFormNavigation';
import { useFormStorage } from '../../storage/formStorage'; 

// Imágenes
import indeterminadaImg from '../../assets/imagenes/inderteminada.jpg';
import temporalImg from '../../assets/imagenes/reloj-tiempo.jpg';

export const ModalidadPage = () => {
	const [showModal, setShowModal] = useState(false);
	const [dates, setDates] = useState(null);
	const { goToNext } = useFormNavigation();
	const updateTipoLicencia = useFormStorage((state) => state.updateTipoLicencia);

	const handleSelectIndeterminada = () => {
		updateTipoLicencia({ tipo: 'Indeterminada', vigencia: null });
		goToNext();
	};

	const handleOpenTemporal = () => {
		setShowModal(true);
	};

	const handleCloseTemporal = () => {
		setShowModal(false);
	};

	const handleConfirmTemporal = (fechaPlazo) => {
		updateTipoLicencia({ tipo: 'Temporal', vigencia: fechaPlazo });
		setShowModal(false);
		goToNext();
	};

	return (
		<FormLayout
			headerTitle='Trámite de Licencia'
			contentTitle='Licencia de Funcionamiento'
			contentSubtitle='Seleccione una opción según el tipo de licencia que desea solicitar.'>
			<div style={{ padding: '24px', flex: 1 }}>
				<Grid container spacing={3}  marginTop={2}>
					{/* Card de Licencia Indeterminada */}
					<Grid item xs={12} sm={6}>
						<ModalityCard
							image={indeterminadaImg}
							title='Indeterminada'
							description='Autorización para actividades económicas en un establecimiento determinado.'
							onClick={handleSelectIndeterminada}
						/>
					</Grid>
					{/* Card de Licencia Temporal */}
					<Grid item xs={12} sm={6}>
						<ModalityCard
							image={temporalImg}
							title='Temporal'
							description='Autorización por un periodo determinado.'
							onClick={handleOpenTemporal}
						/>
					</Grid>
				</Grid>
			</div>
			{/* Modal para licencia temporal */}
			<TemporalModal
				open={showModal}
				onClose={handleCloseTemporal}
				dates={dates}
				setDates={setDates}
				onConfirm={handleConfirmTemporal}
			/>
		</FormLayout>
	);
};
