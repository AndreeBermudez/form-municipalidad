export const LeftPanel = ({ logoSrc, title, description }) => {
	return (
		<div className='bg-blue-800 flex flex-col items-center justify-center text-white text-center py-10 lg:py-20'>
			<img src={logoSrc} alt='Logo Municipalidad' className='w-auto h-16 mb-4 lg:h-24' />
			<h1 className='text-2xl font-bold mb-2 lg:text-4xl'>{title}</h1>
			<p className='text-base max-w-xs lg:text-lg lg:max-w-md'>{description}</p>
		</div>
	);
};
