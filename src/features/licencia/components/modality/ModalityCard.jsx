import { Card, CardMedia, CardContent, Typography } from '@mui/material';

export const ModalityCard = ({ image, title, description, onClick }) => {
	return (
		<Card
			onClick={onClick}
			sx={{
				height: '100%',
				cursor: 'pointer',
				transition: 'all 0.3s ease-in-out',
				borderRadius: '12px',
				overflow: 'hidden',
				boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
				'&:hover': {
					transform: 'translateY(-4px)',
					boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
				},
			}}>
			<CardMedia component='img' height='200' image={image} alt={title} sx={{ objectFit: 'cover' }} />
			<CardContent sx={{ p: 3 }}>
				<Typography variant='h6' sx={{ fontWeight: 600, mb: 1, color: '#2c3e50' }}>
					{title}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{description}
				</Typography>
			</CardContent>
		</Card>
	);
};
