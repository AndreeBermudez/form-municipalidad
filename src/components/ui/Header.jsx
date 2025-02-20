import logo from '../../assets/imagenes/Escudo_de_Nuevo_Chimbote.png';

const Header = ({ title }) => {
	return (
		<div className='bg-blue-800 p-2 flex items-center'>
			<img src={logo} alt='Logo Municipal' className='w-12 h-14 mr-4' />
			<h1 className='text-white text-2xl font-bold flex-1 text-center'>{title}</h1>
		</div>
	);
};

export default Header;
