interface ChoiceInstructionsScreenProps {
  isPost: boolean;
  onContinue: () => void;
}

export function ChoiceInstructionsScreen({ isPost, onContinue }: ChoiceInstructionsScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12" style={{ minHeight: '60vh' }}>
      <div
        className="w-full max-w-xl rounded-2xl p-10 shadow-sm"
        style={{ backgroundColor: '#F0EFED', border: '1px solid #E5E5E5' }}
      >
        {/* Step label */}
        <div className="mb-5">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs tracking-widest uppercase"
            style={{ backgroundColor: '#E8F2F4', color: '#3A7A8C' }}
          >
            {isPost ? 'Step 3: Choices Again' : 'Step 1: Money Choices'}
          </span>
        </div>

        <h2 className="mb-4" style={{ color: '#2D2D2B' }}>
          {isPost ? 'A Few More Choices' : 'Money Choices'}
        </h2>

        <p className="mb-4 leading-relaxed" style={{ color: '#2D2D2B' }}>
          {isPost
            ? "Now you'll see a few more questions like before. Answer with your first instinct — tap the option you prefer for each one."
            : "You'll have a few questions where you choose between a smaller amount of money now and a larger amount of money later."}
        </p>

        {!isPost && (
          <p className="mb-6 text-sm leading-relaxed" style={{ color: '#7A7672' }}>
            For each question, tap the option you prefer. Go with your <span style={{ color: '#2D2D2B', fontWeight: 600 }}>first instinct</span> — there's no right or wrong answer.
          </p>
        )}

        {isPost && (
          <div
            className="rounded-xl p-4 mb-6 text-sm"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', color: '#7A7672' }}
          >
            Just like before — pick whichever option feels right to you. Follow your gut.
          </div>
        )}

        <button
          onClick={onContinue}
          className="w-full py-3 rounded-xl text-white transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
          style={{ backgroundColor: '#2D2D2B' }}
        >
          {isPost ? 'Continue' : 'Got it, start choices'}
        </button>
      </div>
    </div>
  );
}
