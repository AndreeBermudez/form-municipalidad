import { steps } from '../data/steps.data';

export const MobileSteps = ({ currentStep }) => {
	return (
		<div className='w-full'>
			<div className='text-center'>
				<h2 className='text-xl font-semibold mb-2'>
					{steps[currentStep - 1].title}
				</h2>
				<p className='text-gray-500 mb-4'>
					Paso {currentStep} de {steps.length}
				</p>
			</div>
		</div>
	);
};
