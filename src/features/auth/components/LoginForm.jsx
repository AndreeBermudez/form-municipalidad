// LoginForm.jsx
import { useState } from 'react';
import { ContributorTypeSelector } from './ContributorTypeSelector';
import { useFormStorage } from '../../../storage/formStorage';
import { fetchPagoData } from '../../../features/licencia/components/utils/authenticationService';

export const LoginForm = ({ onSubmit, isLoading, error }) => {
  const updateSolicitanteData = useFormStorage((state) => state.updateSolicitanteData);
  const [selectedType, setSelectedType] = useState('juridica');
  const [paymentCode, setPaymentCode] = useState('');
  const [localError, setLocalError] = useState('');
  const [localLoading, setLocalLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalLoading(true);
    setLocalError('');

    try {
      // Llamamos a la API para obtener la data del ciudadano
      const data = await fetchPagoData(paymentCode);

      // Guarda los datos en el localStorage (adaptar los nombres según tu backend)

      localStorage.setItem('dni', data.dni);
      localStorage.setItem('telefono', data.telefono);
      localStorage.setItem('correo', data.correoElectronico);
      localStorage.setItem('nombre', data.nombre);
      localStorage.setItem('apellido', data.apellido);

      // Después de recibir 'data' desde la API
      console.log('data', data);
      // Verás algo como: { ciudadanoId: 1073741824, dni: '...', nombre: '...', ... }

      // Asegúrate de usar data.ciudadanoId:
      localStorage.setItem('ciudadanoId', data.ciudadanoId);


      // Actualiza tu estado global o local con estos datos
      updateSolicitanteData({
        contributorType: selectedType,
        dni: data.dni,
        telefono: data.telefono,
        correoElectronico: data.correoElectronico,
        nombre: data.nombre,
        apellido: data.apellido,
      });

      onSubmit({ type: selectedType, paymentCode });
    } catch (err) {
      console.error(err);
      setLocalError(err.message);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className='p-6 flex flex-col justify-center'>
      <div className='max-w-md mx-auto w-full'>
        <form onSubmit={handleSubmit} className='border rounded-lg p-5 shadow-md bg-white'>
          <h2 className='text-2xl font-bold text-center mb-5'>Ingrese sus Datos</h2>
          <ContributorTypeSelector selectedType={selectedType} onTypeChange={setSelectedType} />

          <div className='mb-4'>
            <label htmlFor='paymentCode' className='block text-sm font-medium text-gray-700'>
              CÓDIGO DE PAGO
            </label>
            <input
              type='text'
              id='paymentCode'
              name='paymentCode'
              value={paymentCode}
              onChange={(e) => setPaymentCode(e.target.value)}
              placeholder='Ingrese su código de pago'
              className='form-input border rounded-lg w-full p-2'
              disabled={localLoading}
            />
          </div>

          {(localError || error) && <div className='text-red-500 text-sm mb-3'>{localError || error}</div>}

          <button type='button' className='text-blue-500 text-sm hover:underline mt-3 w-full text-center'>
            NO TENGO CÓDIGO DE PAGO
          </button>

          <button
            type='submit'
            disabled={localLoading}
            className='w-full bg-red-600 hover:bg-red-700 text-white text-lg py-2 px-4 rounded-md transition duration-300 ease-in-out mt-4 disabled:bg-red-400 disabled:cursor-not-allowed'
          >
            {localLoading ? 'Procesando...' : 'Ingresar'}
          </button>

          <div className='bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mt-3'>
            Recuerde: El código de pago se encuentra ubicado en el voucher que la municipalidad brinda al pagar por su trámite
          </div>
        </form>
      </div>
    </div>
  );
};
