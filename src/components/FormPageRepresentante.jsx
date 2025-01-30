import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import ProgressSteps from "../components/ProgressSteps";

const FormPageRepresentante = () => {
  const navigate = useNavigate();
  const steps = ["Modalidad", "Solicitante", "Representante", "Establecimiento", "Ubicación", "Declaración"];
  const currentStep = 3;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-8">
      {/* Panel fijo para que no haya cambios bruscos en tamaño */}
      <div className="w-[900px] min-h-[550px] bg-white rounded-lg shadow-lg overflow-hidden">
        <Header title="Trámite de Licencia" />
        <ProgressSteps steps={steps} currentStep={currentStep} />

        {/* Contenido Principal */}
        <div className="px-16 py-8">
          <h2 className="text-center text-xl sm:text-2xl font-bold mb-6">Representante Legal</h2>

          {/* Formulario */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            <div className="sm:col-span-2">
              <label className="block text-gray-700 font-medium">Apellidos y Nombres</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Ingrese el nombre del representante" />
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium">N° DNI / N° CE</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Ingrese DNI o CE" />
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium">
                N° de partida electrónica y Asiento de Inscripción Sunarp
                <span className="text-red-600 font-bold"> ¿Qué es?</span>
              </label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Ingrese el número de partida" />
            </div>
          </div>

          {/* Navegación */}
          <div className="flex justify-between mt-8">
            <Button label="Anterior" variant="secondary" onClick={() => navigate("/form-page-inder")} />
            <Button label="Siguiente" variant="primary" onClick={() => navigate("/form-page-establecimiento")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPageRepresentante;
