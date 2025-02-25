import Logo from '../../../assets/logo.png';

export const Header = () => {
	return (
		<header className='bg-[#1E3FAA] text-white flex justify-center items-center w-full h-auto px-5 py-3 rounded-t-md'>
			<div className='flex items-center gap-x-2'>
				<img src={Logo} alt='Logo' className='h-14 w-auto' />
				<div className='font-bold text-3xl'>Tramite de Licencia</div>
			</div>
		</header>
	);
};
