import { steps } from '../data/steps.data';

export const DesktopSteps = ({ currentStep }) => {
	return (
		<div className='hidden lg:block w-full'>
			<div className='flex items-start justify-center overflow-hidden'>
				{steps.map((step) => (
					<div key={step.id} className='flex flex-col items-center flex-1'>
						<div className='flex justify-center items-center w-full'>
							<div className='flex flex-col items-center relative '>
              <div className={`relative
                              before:content-[""] before:absolute before:w-[120px] before:h-[2px] before:bg-gray-300 before:right-10 before:top-5 before:-z-1
                              after:content-[""] after:absolute after:w-[120px] after:h-[2px] after:bg-gray-300 after:left-10 after:top-5 after:-z-1`}>
									<div
										className={`
                    w-10 h-10  
                    flex items-center justify-center 
                    rounded-full border-2 
                    ${
											step.id === currentStep
												? 'bg-[#1E3FAA] border-[#1E3FAA] text-white'
												: 'border-gray-300 text-gray-500 bg-white'
										}
                    z-10
                    `}>
										{step.id}
									</div>
								</div>
								<span className={`${step.id === currentStep ? 'text-[#1E3FAA]' : 'text-gray-500'} mt-2 text-sm  font-semibold text-center top-12`}>
									{step.title}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
