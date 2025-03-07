import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/imagenes/Escudo_de_Nuevo_Chimbote.png';

const Header = ({ title }) => {
  const navigate = useNavigate();

  const handleSalir = () => {
    if (window.confirm('¿Está seguro que desea salir? Se perderán los datos no guardados.')) {
      navigate('/login');
    }
  };

  return (
    <div className="bg-blue-800 p-2 flex items-center">
      <img src={logo} alt="Logo Municipal" className="w-12 h-14 mr-4" />
      <h1 className="text-white text-2xl font-bold flex-1 text-center">{title}</h1>
      <Button variant="contained" color="error" onClick={handleSalir}>
        Salir
      </Button>
    </div>
  );
};

export default Header;