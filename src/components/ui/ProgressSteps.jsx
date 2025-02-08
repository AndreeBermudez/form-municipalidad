const ProgressSteps = ({ steps, currentStep }) => {
  return (
    <div className="w-full px-4 sm:px-10 py-4">
      {/* Versión de escritorio */}
      <div className="hidden sm:flex flex-wrap justify-between items-center relative">
       
        <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gray-300 -z-10" />

      
        <div
          className="absolute top-1/2 left-0 h-[3px] bg-blue-500 -z-10 transition-[width] duration-[1000ms] ease-in-out"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center w-1/6 transition-all duration-500 ease-in-out">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-all duration-700 ease-in-out
                ${
                  index + 1 === currentStep
                    ? "border-blue-700 bg-blue-700 text-white scale-110"
                    : index + 1 < currentStep
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300 text-gray-500"
                }`}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-2 text-gray-600 w-full text-center whitespace-nowrap">{step}</span>
          </div>
        ))}
      </div>
      
      {/* Versión móvil */}
      <div className="sm:hidden text-center transition-all duration-500 ease-in-out">
        <h2 className="font-bold text-lg">{steps[currentStep - 1]}</h2>
        <p className="text-gray-500 text-sm">Paso {currentStep} de {steps.length}</p>
      </div>
    </div>
  );
};

export default ProgressSteps;
