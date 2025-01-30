import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../components/ui/Header";
import Button from "../components/ui/Button";
import ProgressSteps from "../components/ui/ProgressSteps";
import indeterminadaImg from "../assets/imagenes/inderteminada.jpg";
import temporalImg from "../assets/imagenes/temporal.jpg";

const FormPageOne = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [dates, setDates] = useState({ from: "", to: "" });

  const steps = ["Modalidad", "Solicitante", "Representante", "Establecimiento", "Ubicación", "Declaración"];
  const currentStep = 1;

  const handleNavigateToInder = () => {
    navigate("/form-page-inder");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-8">
      <div className="w-[900px] bg-white rounded-lg shadow-lg overflow-hidden">
        <Header title="Trámite de Licencia" />
        <ProgressSteps steps={steps} currentStep={currentStep} />

        <div className="px-16 pb-8">
          <h2 className="text-center text-xl sm:text-2xl font-bold mb-2">Licencia de Funcionamiento</h2>
          <p className="text-center text-gray-600 mb-8">
            Seleccione una opción según el tipo de licencia que desea solicitar.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Card de Indeterminada */}
            <div
              className="border rounded-lg p-4 sm:p-7 cursor-pointer transition duration-300 ease-in-out shadow-lg hover:shadow-2xl w-full max-w-sm mx-auto"
              onClick={handleNavigateToInder}
            >
              <img src={indeterminadaImg} alt="Indeterminada" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="font-bold mb-2">Indeterminada</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Es la autorización que otorgan las municipalidades a los titulares para el desarrollo de sus actividades económicas en un establecimiento determinado.
              </p>
            </div>

            {/* Card de Temporal con Modal */}
            <div
              className="border rounded-lg p-4 sm:p-6 cursor-pointer transition duration-300 ease-in-out shadow-lg hover:shadow-2xl w-full max-w-sm mx-auto"
              onClick={() => setShowModal(true)}
            >
              <img src={temporalImg} alt="Temporal" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="font-bold mb-2">Temporal</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Es la autorización que otorga la Municipalidad para que una persona natural o jurídica pueda iniciar sus actividades en su negocio de comercio, industria o servicios.
              </p>
            </div>
          </div>

          {/* Modal para seleccionar fechas */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
                <h2 className="text-xl font-bold text-center mb-4">Licencia Temporal</h2>
                <p className="text-sm text-center mb-4">Colocar la fecha desde que se usará, hasta la fecha de finalización.</p>

                <div className="mb-4">
                  <label className="block font-medium">Desde:</label>
                  <input
                    type="date"
                    className="w-full border rounded-lg p-2"
                    value={dates.from}
                    onChange={(e) => setDates({ ...dates, from: e.target.value })}
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium">Hasta:</label>
                  <input
                    type="date"
                    className="w-full border rounded-lg p-2"
                    value={dates.to}
                    onChange={(e) => setDates({ ...dates, to: e.target.value })}
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    onClick={handleNavigateToInder}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Botones de navegación */}
          <div className="flex justify-between mt-8">
            <Button label="Anterior" variant="secondary" />
            <Button label="Siguiente" variant="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPageOne;
