import { Box, Modal, Paper, TextField, Typography, Button } from '@mui/material';

export const TemporalModal = ({ open, onClose, dates, setDates, onConfirm }) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				p: 2,
			}}>
			<Paper
				sx={{
					position: 'relative',
					width: '100%',
					maxWidth: 500,
					p: 4,
					borderRadius: '12px',
					backgroundColor: 'white',
					boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
					outline: 'none',
				}}>
				<Typography variant='h6' sx={{ mb: 2, fontWeight: 700, color: '#2c3e50' }}>
					Licencia Temporal
				</Typography>
				<Typography variant='body2' sx={{ mb: 3, color: '#64748b' }}>
					Seleccione la fecha de inicio y fin.
				</Typography>

				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 3,
						mb: 3,
					}}>
					<TextField
						fullWidth
						label='Desde'
						type='date'
						value={dates.from}
						onChange={(e) => setDates({ ...dates, from: e.target.value })}
						InputLabelProps={{ shrink: true }}
					/>
					<TextField
						fullWidth
						label='Hasta'
						type='date'
						value={dates.to}
						onChange={(e) => setDates({ ...dates, to: e.target.value })}
						InputLabelProps={{ shrink: true }}
					/>
				</Box>

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						mt: 3,
					}}>
					<Button variant='contained' color='inherit' onClick={onClose}>
						Cancelar
					</Button>
					<Button variant='contained' color='success' onClick={onConfirm} disabled={!dates.from || !dates.to}>
						Continuar
					</Button>
				</Box>
			</Paper>
		</Modal>
	);
};
