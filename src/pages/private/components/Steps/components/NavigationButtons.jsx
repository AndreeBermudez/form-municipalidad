export const NavigationButtons = ({
	currentStep,
	onNext,
	onPrev,
	totalSteps,
}) => {
	return (
		<div className='flex justify-between mt-8'>
			<button
				onClick={onPrev}
				disabled={currentStep === 1}
				className='px-4 py-2 text-[#1E3FAA] border border-[#1E3FAA] rounded disabled:opacity-50 disabled:cursor-not-allowed'>
				Anterior
			</button>
			<button
				onClick={onNext}
				disabled={currentStep === totalSteps}
				className='px-4 py-2 bg-[#1E3FAA] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed'>
				Siguiente
			</button>
		</div>
	);
};
