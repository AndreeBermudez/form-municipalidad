import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/imagenes/Escudo_de_Nuevo_Chimbote.png';

const InicioForm = () => {
  const navigate = useNavigate();
  const [personType, setPersonType] = useState('juridica');
  const [formData, setFormData] = useState({
    paymentCode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    // Se envía el tipo de persona mediante el state de navigate
    navigate('/formulario/pag-one', { state: { personType } });
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* Panel Izquierdo */}
      <div className='bg-blue-800 flex flex-col items-center justify-center text-white text-center py-10 lg:py-20'>
        <img src={logo} alt='Logo Municipalidad' className='w-28 h-32 mb-4 lg:w-40 lg:h-40' />
        <h1 className='text-2xl font-bold mb-2 lg:text-4xl'>Trámite de Licencia</h1>
        <p className='text-base max-w-xs lg:text-lg lg:max-w-md'>
          Municipalidad de Nuevo Chimbote le ofrece esta plataforma virtual para la gestión eficiente de sus trámites documentarios.
        </p>
      </div>

      {/* Panel Derecho */}
      <div className='p-6 flex flex-col justify-center'>
        <div className='max-w-md mx-auto w-full'>
          <form onSubmit={handleSubmit} className='border rounded-lg p-5 shadow-md bg-white'>
            <h2 className='text-2xl font-bold text-center mb-5'>Ingrese sus Datos</h2>

            {/* Selector de Tipo de Persona */}
            <div className='space-y-3 mb-5'>
              {['juridica', 'natural'].map((type) => (
                <label
                  key={type}
                  className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer w-full ${
                    personType === type ? 'bg-gray-100 shadow-md' : 'bg-white'
                  }`}
                  onClick={() => setPersonType(type)}>
                  <input
                    type='radio'
                    value={type}
                    checked={personType === type}
                    onChange={() => setPersonType(type)}
                    className='form-radio'
                  />
                  <span className='ml-2 font-medium'>
                    {type === 'juridica' ? 'PERSONA JURÍDICA' : 'PERSONA NATURAL'}
                  </span>
                </label>
              ))}
            </div>

            {/* Campo Código de Pago */}
            <div className='mb-4'>
              <label htmlFor='paymentCode' className='block text-sm font-medium text-gray-700'>
                CÓDIGO DE PAGO
              </label>
              <input
                type='text'
                id='paymentCode'
                name='paymentCode'
                value={formData.paymentCode}
                onChange={handleInputChange}
                placeholder='Ingrese su código de pago'
                className='form-input border rounded-lg w-full p-2'
              />
            </div>

            {/* Enlace y Botón de Ingreso */}
            <button type='button' className='text-blue-500 text-sm hover:underline mt-3 w-full text-center'>
              NO TENGO CÓDIGO DE PAGO
            </button>

            <button
              type='submit'
              className='w-full bg-red-600 hover:bg-red-700 text-white text-lg py-2 px-4 rounded-md transition duration-300 ease-in-out mt-4'>
              Ingresar
            </button>

            {/* Mensaje de Información */}
            <div className='bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mt-3'>
              Recuerde: El código de pago se encuentra ubicado en el voucher que la municipalidad brinda al pagar por su trámite
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InicioForm;
