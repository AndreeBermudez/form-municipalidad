import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import Button from "../components/ui/Button";
import ProgressSteps from "../components/ui/ProgressSteps";

const FormPageDeclaracion = () => {
  const navigate = useNavigate();
  const steps = ["Modalidad", "Solicitante", "Representante", "Establecimiento", "Ubicación", "Declaración"];
  const currentStep = 6;

  const [declarations, setDeclarations] = useState({
    legalRepresentative: false,
    safetyCompliance: false,
    professionalTitle: false,
    acceptanceOfTerms: false,
  });

  const handleCheckboxChange = (key) => {
    setDeclarations({ ...declarations, [key]: !declarations[key] });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-8">
      {/* Panel con tamaño uniforme */}
      <div className="w-[900px] min-h-[550px] bg-white rounded-lg shadow-lg overflow-hidden">
        <Header title="Trámite de Licencia" />
        <ProgressSteps steps={steps} currentStep={currentStep} />

        {/* Contenido Principal */}
        <div className="px-16 py-8">
          <h2 className="text-center text-xl sm:text-2xl font-bold mb-4">Declaración Jurada</h2>

          <p className="text-gray-700 mb-4 font-medium">Declaro (DE CORRESPONDER, MARCAR CON X):</p>

          {/* Lista de declaraciones */}
          <div className="space-y-4">
            {[
              { key: "legalRepresentative", text: "Cuento con poder suficiente vigente para actuar como representante legal de la persona jurídica conductora (alternativamente, de la persona natural que represento)." },
              { key: "safetyCompliance", text: "El establecimiento cumple con las condiciones de seguridad en edificaciones y me someto a la inspección técnica que corresponda en función al nivel de riesgo, de conformidad con la legislación aplicable." },
              { key: "professionalTitle", text: "Cuento con título profesional vigente y estoy habilitado por el colegio profesional correspondiente (en el caso de servicios relacionados con la salud)." },
              { key: "acceptanceOfTerms", text: "Tengo conocimiento de que la presente Declaración Jurada y documentación está sujeta a fiscalización posterior. En caso de haber proporcionado información falsa, se aplicarán sanciones y la revocatoria de la licencia otorgada." }
            ].map((item) => (
              <div key={item.key} className="flex items-start space-x-4 bg-gray-100 p-3 rounded-lg shadow-sm">
                <input
                  type="checkbox"
                  checked={declarations[item.key]}
                  onChange={() => handleCheckboxChange(item.key)}
                  className="w-6 h-6 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Observaciones */}
          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">Observaciones o comentarios del solicitante:</label>
            <textarea className="w-full border rounded-lg p-3 h-20 resize-none" placeholder="Ingrese sus comentarios aquí..."></textarea>
          </div>

          {/* Navegación */}
          <div className="flex justify-between mt-8">
            <Button label="Anterior" variant="secondary" onClick={() => navigate("/form-page-ubicacion")} />
            <Button label="Finalizar" variant="primary" onClick={() => alert("Formulario completado")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPageDeclaracion;
