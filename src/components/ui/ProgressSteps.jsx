const ProgressSteps = ({ steps, currentStep }) => {
    return (
      <div className="px-8 py-6">
        {/* Contenedor de la barra de progreso */}
        <div className="flex items-center justify-evenly relative">
          {/* Línea de progreso */}
          <div className="absolute top-5 left-0 right-0 h-[3px] bg-gray-300 -z-10" />
          <div
            className="absolute top-5 left-0 h-[3px] bg-blue-500 -z-10 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
  
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center w-1/6">
              {/* Círculo del paso */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-all duration-300
                  ${
                    index + 1 === currentStep
                      ? "border-blue-700 bg-blue-700 text-white"
                      : index + 1 < currentStep
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-gray-300 text-gray-500"
                  }`}
              >
                {index + 1}
              </div>
              {/* Nombre del paso */}
              <span className="text-xs mt-2 text-gray-600 w-full text-center whitespace-nowrap">{step}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProgressSteps;
  