import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import ProgressSteps from "../components/ProgressSteps";

const FormPageInder = () => {
    const navigate = useNavigate();
    const steps = ["Modalidad", "Solicitante", "Representante", "Establecimiento", "Ubicación", "Declaración"];
  const currentStep = 2; 

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-8">
      <div className="w-[900px] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Reutilizado */}
        <Header title="Trámite de Licencia" />

        {/* Barra de progreso */}
        <ProgressSteps steps={steps} currentStep={currentStep} />

        {/* Contenido principal */}
        <div className="px-16 py-8">
          <h2 className="text-center text-xl sm:text-2xl font-bold mb-4">Licencia de Funcionamiento</h2>

          {/* Formulario */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-3">
              <label className="block text-gray-700 font-medium">Apellidos y Nombres / Razón Social</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Ingrese su nombre o razón social" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">N° RUC</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Ingrese su RUC" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">N° DNI / N° CE</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Ingrese su DNI o CE" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Correo Electrónico</label>
              <input type="email" className="w-full border rounded-lg p-2" placeholder="Ingrese su correo" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">N° Teléfono</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Ingrese su teléfono" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">N° Int. / Mz / Lt / Otros</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Ingrese su dirección" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Av. / Jr. / Ca. / Pje. / Otros</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Ingrese su avenida o calle" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Urb. / AA.HH. / Otros</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Ingrese su urbanización" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Distrito</label>
              <select className="w-full border rounded-lg p-2">
                <option>Seleccione un distrito</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Provincia</label>
              <select className="w-full border rounded-lg p-2">
                <option>Seleccione una provincia</option>
              </select>
            </div>
          </div>

          {/* Navegación */}
          <div className="flex justify-between mt-8">
          <Button label="Anterior" variant="secondary" onClick={() => navigate("/form-page-one")} />
          <Button label="Continuar" variant="primary" onClick={() => navigate("/form-page-representante")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPageInder;
