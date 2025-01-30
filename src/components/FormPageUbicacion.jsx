import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import ProgressSteps from "../components/ProgressSteps";
import GoogleMapComponent from "../components/GoogleMapComponent";

const FormPageUbicacion = () => {
    const navigate = useNavigate();
    const steps = ["Modalidad", "Solicitante", "Representante", "Establecimiento", "Ubicación", "Declaración"];
    const currentStep = 5;

    const [address, setAddress] = useState("");

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-8">
            {/* PARA DARLE TAMAÑO AL PANEL */}
            <div className="w-[900px] min-h-[550px] bg-white rounded-lg shadow-lg overflow-hidden">
                <Header title="Trámite de Licencia" />
                <ProgressSteps steps={steps} currentStep={currentStep} />

                {/* CONTENIDO PRINCIPAL */}
                <div className="px-16 py-8">
                    <h2 className="text-center text-xl sm:text-2xl font-bold">Croquis de la ubicación</h2>
                    <p className="text-center text-gray-600 mb-6">Selecciona la ubicación del establecimiento</p>

                    {/* Mapa */}
                    <div className="border rounded-lg overflow-hidden shadow-md">
                        <GoogleMapComponent setAddress={setAddress} />
                    </div>

                    {/* Dirección seleccionada */}
                    <div className="mt-4">
                        <label className="font-medium text-gray-700 block">
                            📍 Dirección Seleccionada
                        </label>
                        <input type="text" className="w-full border rounded-lg p-2 mt-1" value={address} readOnly />
                    </div>

                    {/* Área total solicitada */}
                    <div className="mt-4">
                        <label className="block font-medium text-gray-700">Área total solicitada (m²)</label>
                        <input type="number" className="w-full border rounded-lg p-2" placeholder="Ingrese el área total en m²" />
                    </div>

                    {/* Navegación */}
                    <div className="flex justify-between mt-8">
                        <Button label="Anterior" variant="secondary" onClick={() => navigate("/form-page-establecimiento")} />
                        <Button label="Siguiente" variant="primary" onClick={() => navigate("/form-page-declaracion")} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormPageUbicacion;
