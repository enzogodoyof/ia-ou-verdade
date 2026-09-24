interface ProgressBarProps {
  currentStep: 1 | 2 | 3 | 4 | 5;
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  // Barra minimalista de progresso (3px de altura)
  const percentages = {
    1: "25%",
    2: "50%",
    3: "75%",
    4: "100%",
    5: "100%",
  };

  return (
    <div className="w-full bg-slate-100 h-1 sticky top-16 z-40">
      <div
        className="bg-blue-600 h-full transition-all duration-500 ease-out"
        style={{ width: percentages[currentStep] }}
      />
    </div>
  );
}
