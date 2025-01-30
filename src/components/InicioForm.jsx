import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import logo from "../assets/imagenes/Escudo_de_Nuevo_Chimbote.png"; 

const InicioForm = () => {
    const navigate = useNavigate(); // Hook para la navegación
    const [personType, setPersonType] = useState("natural");
    const [formData, setFormData] = useState({
        ruc: "",
        zonificationCode: "",
        paymentCode: "",
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
        console.log("Formulario enviado:", formData);
         // 🔹 Redirige a FormPageOne.jsx
    navigate("/form-page-one");
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Panel Izquierdo (Responsive) */}
            <div className="bg-blue-800 flex flex-col items-center justify-center text-white text-center py-10 lg:py-20">
                <img
                    src={logo || "/placeholder.svg"}
                    alt="Logo Municipalidad"
                    className="w-28 h-32 mb-4 lg:w-40 lg:h-40"
                />
                <h1 className="text-2xl font-bold mb-2 lg:text-4xl">Trámite de Licencia</h1>
                <p className="text-base max-w-xs lg:text-lg lg:max-w-md">
                    Municipalidad de Nuevo Chimbote le ofrece esta plataforma virtual para la gestión eficiente de sus trámites documentarios.
                </p>
            </div>

            {/* Panel Derecho */}
            <div className="p-6 flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full">
                    <form onSubmit={handleSubmit} className="border rounded-lg p-5 shadow-md bg-white">
                        <h2 className="text-2xl font-bold text-center mb-5">Ingrese sus Datos</h2>

                        {/* Selector de Tipo de Persona */}
                        <div className="space-y-3 mb-5">
                            <label
                                className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer ${personType === "juridica" ? "bg-gray-100 shadow-md" : "bg-white"
                                    }`}
                                onClick={() => setPersonType("juridica")}
                            >
                                <input
                                    type="radio"
                                    value="juridica"
                                    checked={personType === "juridica"}
                                    onChange={() => setPersonType("juridica")}
                                    className="form-radio"
                                />
                                <span className="font-medium">PERSONA JURÍDICA</span>
                            </label>

                            <label
                                className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer ${personType === "natural" ? "bg-gray-100 shadow-md" : "bg-white"
                                    }`}
                                onClick={() => setPersonType("natural")}
                            >
                                <input
                                    type="radio"
                                    value="natural"
                                    checked={personType === "natural"}
                                    onChange={() => setPersonType("natural")}
                                    className="form-radio"
                                />
                                <span className="font-medium">PERSONA NATURAL</span>
                            </label>
                        </div>

                        {/* Campos del Formulario */}
                        <div className="space-y-3">
                            <div>
                                <label htmlFor="ruc" className="block text-sm font-medium text-gray-700">
                                    RUC
                                </label>
                                <input
                                    type="text"
                                    id="ruc"
                                    name="ruc"
                                    value={formData.ruc}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese su RUC"
                                    className="form-input border rounded-lg w-full p-2"
                                />
                            </div>

                            <div>
                                <label htmlFor="zonificationCode" className="block text-sm font-medium text-gray-700">
                                    CÓDIGO DE ZONIFICACIÓN
                                </label>
                                <input
                                    type="text"
                                    id="zonificationCode"
                                    name="zonificationCode"
                                    value={formData.zonificationCode}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese su código de zonificación"
                                    className="form-input border rounded-lg w-full p-2"
                                />
                            </div>

                            <div>
                                <label htmlFor="paymentCode" className="block text-sm font-medium text-gray-700">
                                    CÓDIGO DE PAGO
                                </label>
                                <input
                                    type="text"
                                    id="paymentCode"
                                    name="paymentCode"
                                    value={formData.paymentCode}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese su código de pago"
                                    className="form-input border rounded-lg w-full p-2"
                                />
                            </div>

                            <button
                                type="button"
                                className="text-blue-500 text-sm hover:underline"
                            >
                                NO TENGO CÓDIGO DE ZONIFICACIÓN
                            </button>

                            <button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-2 px-4 rounded-md transition duration-300 ease-in-out"
                            >
                                Ingresar
                            </button>

                            <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mt-3">
                                Recuerde: Una persona natural tiene RUC que empieza con 10 y actúa
                                como individuo con responsabilidad directa.
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InicioForm;


