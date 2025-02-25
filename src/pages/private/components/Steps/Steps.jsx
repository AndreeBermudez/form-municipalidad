import { useState } from "react"
import { DesktopSteps } from "./components/DesktopSteps"
import { steps } from "./data/steps.data"
import { NavigationButtons } from "./components/NavigationButtons"
import { MobileSteps } from "./components/MobileSteps"

export const Steps = ({children}) => {
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }
  return (
    <>
      {/* Desktop version */}
      <div className="hidden lg:block">
        <DesktopSteps currentStep={currentStep} />
        {/* Contenido del paso */}
        <div className="my-8 p-4 border rounded-lg">
          <p className="text-gray-500 text-center">Contenido del paso {currentStep}</p>
        </div>
        {children}
        <NavigationButtons
          currentStep={currentStep}
          onNext={handleNext}
          onPrev={handlePrev}
          totalSteps={steps.length}
        />
      </div>

      {/* Mobile version */}
      <div className="lg:hidden flex flex-col min-h-screen">
        <MobileSteps currentStep={currentStep} onNext={handleNext} onPrev={handlePrev} />
        {/* Contenido del paso */}
        <div className="flex-1 my-8 p-4 border rounded-lg">
          <p className="text-gray-500 text-center">Contenido del paso {currentStep}</p>
        </div>
        {children}
        <NavigationButtons
          currentStep={currentStep}
          onNext={handleNext}
          onPrev={handlePrev}
          totalSteps={steps.length}
        />
      </div>
    </>
  )
}