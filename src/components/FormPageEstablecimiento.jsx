import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import Button from "../components/ui/Button";
import ProgressSteps from "../components/ui/ProgressSteps";

const FormPageEstablecimiento = () => {
  const navigate = useNavigate();
  const steps = ["Modalidad", "Solicitante", "Representante", "Establecimiento", "Ubicación", "Declaración"];
  const currentStep = 4;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-8">
      {/* Panel con tamaño uniforme */}
      <div className="w-[900px] min-h-[550px] bg-white rounded-lg shadow-lg overflow-hidden">
        <Header title="Trámite de Licencia" />
        <ProgressSteps steps={steps} currentStep={currentStep} />

        {/* Contenido Principal */}
        <div className="px-16 py-8">
          <h2 className="text-center text-xl sm:text-2xl font-bold mb-6">Datos del Establecimiento</h2>

          {/* Formulario */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            <div>
              <label className="block text-gray-700 font-medium">Nombre Comercial</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Ingrese el nombre comercial" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Código CIIU</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Ingrese el código CIIU" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Giros</label>
              <select className="w-full border rounded-lg p-2">
                <option>Seleccione el giro correspondiente</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Actividad</label>
              <select className="w-full border rounded-lg p-2">
                <option>Seleccione la actividad</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Zonificación</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="(Llenado automático o no considerarlo)" disabled />
            </div>
          </div>

          {/* Dirección */}
          <h3 className="text-blue-600 font-semibold mt-6">Dirección</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2">
            <div>
              <label className="block text-gray-700 font-medium">Av./Jr./Ca./Pje./Otros</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Ingrese la dirección" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">N° Int./Mz./Lt./Otros</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Ingrese el número" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Urb./ AA.HH/ Otros (*)</label>
              <input type="text" className="w-full border rounded-lg p-2" placeholder="Ingrese la urbanización" />
            </div>
          </div>

          {/* Navegación */}
          <div className="flex justify-between mt-8">
            <Button label="Anterior" variant="secondary" onClick={() => navigate("/form-page-representante")} />
            <Button label="Siguiente" variant="primary" onClick={() => navigate("/form-page-ubicacion")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPageEstablecimiento;
