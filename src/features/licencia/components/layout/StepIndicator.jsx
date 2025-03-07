import { Paper, Step, StepLabel, Stepper } from '@mui/material';

const ProgressSteps = ({ steps, currentStep }) => {
	return (
		<Paper sx={{ width: '300px', height: '600px', overflowY: 'auto', boxShadow: 3, p: 2, flexShrink: 0 }}>
			<Stepper activeStep={currentStep - 1} orientation='vertical' sx={{ '& .MuiStepLabel-root': { py: 1 } }}>
				{steps.map((label, index) => (
					<Step key={index}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</Paper>
	);
};

export default ProgressSteps;
