interface ThankYouScreenProps {
  group: 'A' | 'B';
  reflectionText: string;
  onRestart: () => void;
}

export function ThankYouScreen({ group, reflectionText, onRestart }: ThankYouScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12" style={{ backgroundColor: '#F5F2EE' }}>
      <div
        className="w-full max-w-xl rounded-2xl p-10 shadow-sm text-center"
        style={{ backgroundColor: '#F0EFED', border: '1px solid #E5E5E5' }}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl"
          style={{ backgroundColor: '#E8F2F4' }}
        >
          {group === 'A' ? '📮' : '✏️'}
        </div>

        <h1 className="mb-3" style={{ color: '#2D2D2B' }}>
          Thank You!
        </h1>

        <p className="mb-6 leading-relaxed" style={{ color: '#7A7672' }}>
          You've completed the activity. Your responses will help us understand how writing prompts
          affect financial decision-making and present bias.
        </p>

        {/* Reflection callout */}
        {reflectionText.trim().length > 0 && (
          <div
            className="rounded-xl p-5 mb-8 text-left"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}
          >
            <p className="text-xs uppercase tracking-wide mb-2" style={{ color: '#3A7A8C' }}>
              Your commitment to future you:
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#2D2D2B', fontStyle: 'italic' }}>
              "{reflectionText}"
            </p>
          </div>
        )}

        {/* Key takeaway */}
        <div
          className="rounded-xl p-5 mb-8 text-left"
          style={{ backgroundColor: '#F8F7F5', border: '1px solid #E5E5E5' }}
        >
          <p className="text-xs uppercase tracking-wide mb-2" style={{ color: '#7A7672' }}>
            Key takeaway
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#7A7672' }}>
            {group === 'A'
              ? 'Thinking concretely about your future self — through writing — can make future rewards feel more real and reduce present bias over time.'
              : 'Delay discounting is completely normal. Even being aware of it in the moment can help you make choices that better reflect your long-term interests.'}
          </p>
        </div>

        {/* Research note */}
        <div className="mb-8">
          <p className="text-xs leading-relaxed" style={{ color: '#B8B5B2' }}>
            This tool is part of a micro-intervention study exploring delay discounting and future-self vividness. Your participation is appreciated.
          </p>
        </div>

        <button
          onClick={onRestart}
          className="w-full py-3 rounded-xl transition-all duration-200 hover:opacity-80 active:scale-[0.99]"
          style={{
            backgroundColor: 'transparent',
            border: '1.5px solid #E5E5E5',
            color: '#7A7672',
          }}
        >
          Restart Activity
        </button>
      </div>
    </div>
  );
}
