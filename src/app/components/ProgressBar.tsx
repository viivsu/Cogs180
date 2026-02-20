interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  group: 'A' | 'B';
}

export function ProgressBar({ currentStep, totalSteps, group }: ProgressBarProps) {
  const progress = Math.min((currentStep / totalSteps) * 100, 100);

  const phases = [
    { label: 'Baseline Choices', steps: [1, 2, 3, 4] },
    { label: 'Writing', steps: [5] },
    { label: 'Post Choices', steps: [6, 7, 8, 9] },
    { label: 'Feedback', steps: [10, 11] },
  ];

  const getCurrentPhase = () => {
    if (currentStep <= 4) return 0;
    if (currentStep === 5) return 1;
    if (currentStep <= 9) return 2;
    return 3;
  };

  const currentPhase = getCurrentPhase();

  return (
    <div className="w-full mb-8">
      {/* Phase indicators */}
      <div className="flex items-center justify-between mb-3">
        {phases.map((phase, idx) => (
          <div key={idx} className="flex flex-col items-center flex-1">
            <div
              className="text-xs tracking-wide uppercase mb-1 transition-colors duration-300"
              style={{
                color: idx === currentPhase ? '#3A7A8C' : idx < currentPhase ? '#7A7672' : '#B8B5B2',
                fontWeight: idx === currentPhase ? 600 : 400,
              }}
            >
              {phase.label}
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: '#E5E5E5' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            backgroundColor: '#3A7A8C',
          }}
        />
      </div>

      {/* Step counter */}
      <div className="flex justify-end mt-2">
        <span className="text-xs" style={{ color: '#7A7672' }}>
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
}
