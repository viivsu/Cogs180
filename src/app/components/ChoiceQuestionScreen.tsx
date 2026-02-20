type Choice = 'sooner' | 'later';

interface ChoiceQuestionScreenProps {
  questionIndex: number;
  totalQuestions: number;
  sooner: string;
  later: string;
  selected: Choice | null;
  onSelect: (choice: Choice) => void;
  onNext: () => void;
  footerNote?: string;
}

export function ChoiceQuestionScreen({
  questionIndex,
  totalQuestions,
  sooner,
  later,
  selected,
  onSelect,
  onNext,
  footerNote,
}: ChoiceQuestionScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12" style={{ minHeight: '60vh' }}>
      <div
        className="w-full max-w-xl rounded-2xl p-10 shadow-sm"
        style={{ backgroundColor: '#F0EFED', border: '1px solid #E5E5E5' }}
      >
        {/* Counter */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs tracking-widest uppercase"
            style={{ backgroundColor: '#E8F2F4', color: '#3A7A8C' }}
          >
            Question {questionIndex} of {totalQuestions}
          </span>
          <span className="text-xs" style={{ color: '#7A7672' }}>
            Pick one
          </span>
        </div>

        <h2 className="mb-8" style={{ color: '#2D2D2B' }}>
          Which would you prefer?
        </h2>

        {/* Choice cards */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Sooner option */}
          <button
            onClick={() => onSelect('sooner')}
            className="w-full rounded-xl p-5 text-left transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            style={{
              backgroundColor: selected === 'sooner' ? '#2D2D2B' : '#FFFFFF',
              border: selected === 'sooner' ? '2px solid #2D2D2B' : '2px solid #E5E5E5',
              color: selected === 'sooner' ? '#FFFFFF' : '#2D2D2B',
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all"
                style={{
                  borderColor: selected === 'sooner' ? '#FFFFFF' : '#E5E5E5',
                  backgroundColor: selected === 'sooner' ? '#FFFFFF' : 'transparent',
                }}
              >
                {selected === 'sooner' && (
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#2D2D2B' }} />
                )}
              </div>
              <div>
                <div className="text-sm mb-0.5" style={{ color: selected === 'sooner' ? 'rgba(255,255,255,0.7)' : '#7A7672' }}>
                  Option A
                </div>
                <div className="text-lg" style={{ fontWeight: 600 }}>{sooner}</div>
              </div>
            </div>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ backgroundColor: '#E5E5E5' }} />
            <span className="text-xs" style={{ color: '#B8B5B2' }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#E5E5E5' }} />
          </div>

          {/* Later option */}
          <button
            onClick={() => onSelect('later')}
            className="w-full rounded-xl p-5 text-left transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            style={{
              backgroundColor: selected === 'later' ? '#3A7A8C' : '#FFFFFF',
              border: selected === 'later' ? '2px solid #3A7A8C' : '2px solid #E5E5E5',
              color: selected === 'later' ? '#FFFFFF' : '#2D2D2B',
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all"
                style={{
                  borderColor: selected === 'later' ? '#FFFFFF' : '#E5E5E5',
                  backgroundColor: selected === 'later' ? '#FFFFFF' : 'transparent',
                }}
              >
                {selected === 'later' && (
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#3A7A8C' }} />
                )}
              </div>
              <div>
                <div className="text-sm mb-0.5" style={{ color: selected === 'later' ? 'rgba(255,255,255,0.7)' : '#7A7672' }}>
                  Option B
                </div>
                <div className="text-lg" style={{ fontWeight: 600 }}>{later}</div>
              </div>
            </div>
          </button>
        </div>

        {/* Footer note */}
        {footerNote && (
          <p className="text-xs mb-6 text-center" style={{ color: '#B8B5B2' }}>
            {footerNote}
          </p>
        )}

        {/* Next button */}
        <button
          onClick={onNext}
          disabled={!selected}
          className="w-full py-3 rounded-xl text-white transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#2D2D2B' }}
        >
          {questionIndex === totalQuestions ? 'Continue' : 'Next question'}
        </button>
      </div>
    </div>
  );
}
