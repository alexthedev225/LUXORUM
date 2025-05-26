"use client";

type StepperProps = {
  steps: { id: number; title: string }[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

export default function Stepper({
  steps,
  currentStep,
  setCurrentStep,
}: StepperProps) {
  return (
    <nav className="flex justify-between mb-10">
      {steps.map((step) => (
        <div key={step.id} className="flex-1 text-center">
          <div
            className={`inline-block w-10 h-10 rounded-full text-lg font-bold leading-10 cursor-pointer
              ${
                step.id === currentStep
                  ? "bg-amber-400 text-black shadow-lg"
                  : "bg-zinc-800 text-zinc-400"
              }
            `}
            onClick={() => setCurrentStep(step.id)}
            aria-current={step.id === currentStep}
          >
            {step.id}
          </div>
          <p className="mt-2 text-sm uppercase tracking-widest">{step.title}</p>
        </div>
      ))}
    </nav>
  );
}
