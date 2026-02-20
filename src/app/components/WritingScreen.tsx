interface WritingScreenProps {
  group: 'A' | 'B';
  text: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

const GROUP_A_PROMPTS = [
  'Describe something you\'re looking forward to in the future',
  'Share a challenge you\'re currently working through',
  'Write about a goal you hope future-you has made progress on',
  'Describe a small moment that mattered to you recently',
];

const GROUP_B_PROMPTS = [
  'How you got to class or work today',
  'A recent meal or snack you had',
  'Your morning routine from today',
  'A task or errand you completed recently',
];

export function WritingScreen({ group, text, onChange, onSubmit }: WritingScreenProps) {
  const isPostcard = group === 'A';
  const prompts = isPostcard ? GROUP_A_PROMPTS : GROUP_B_PROMPTS;
  const minChars = isPostcard ? 60 : 40;
  const isValid = text.trim().length >= minChars;

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
            Step 2: Writing
          </span>
        </div>

        <h2 className="mb-2" style={{ color: '#2D2D2B' }}>
          {isPostcard ? 'Write a Postcard to Future You' : 'Describe a Recent Experience'}
        </h2>

        <p className="mb-6 text-sm leading-relaxed" style={{ color: '#7A7672' }}>
          {isPostcard
            ? 'Write a short message (2–4 sentences) to yourself, as if you\'re sending a postcard from today.'
            : 'Write 2–3 sentences describing a recent, ordinary experience with concrete details.'}
        </p>

        {/* Prompt suggestions */}
        <div
          className="rounded-xl p-4 mb-6"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}
        >
          <p className="text-xs mb-3" style={{ color: '#7A7672', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {isPostcard ? 'You could write about:' : 'For example:'}
          </p>
          <ul className="space-y-2">
            {prompts.map((prompt, i) => (
              <li key={i} className="flex gap-2 items-start text-sm" style={{ color: '#7A7672' }}>
                <span style={{ color: '#3A7A8C', fontWeight: 600 }}>·</span>
                <span>{prompt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Postcard-style writing area */}
        {isPostcard ? (
          <div
            className="rounded-xl overflow-hidden mb-6"
            style={{ border: '1.5px solid #E5E5E5', backgroundColor: '#FFFFFF' }}
          >
            {/* Postcard header */}
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{ backgroundColor: '#3A7A8C' }}
            >
              <span className="text-white text-sm" style={{ fontWeight: 600 }}>
                📮 Postcard to Future Me
              </span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            {/* Greeting */}
            <div className="px-5 pt-4 pb-1">
              <p className="text-sm" style={{ color: '#7A7672', fontStyle: 'italic' }}>Dear Future Me,</p>
            </div>

            <textarea
              className="w-full px-5 py-3 resize-none outline-none text-sm leading-relaxed"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#2D2D2B',
                minHeight: '120px',
                caretColor: '#3A7A8C',
              }}
              placeholder="Write your message here — share something that's happening now, a hope, a challenge, or just a small moment that mattered..."
              value={text}
              onChange={(e) => onChange(e.target.value)}
            />

            {/* Signature */}
            <div className="px-5 pb-4 pt-1 flex items-center justify-between">
              <p className="text-sm" style={{ color: '#7A7672', fontStyle: 'italic' }}>
                With care, Present You 🌱
              </p>
              <span className="text-xs" style={{ color: text.trim().length < minChars ? '#B8B5B2' : '#3A7A8C' }}>
                {text.trim().length < minChars
                  ? `${minChars - text.trim().length} more chars`
                  : '✓ Ready to send'}
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <textarea
              className="w-full px-5 py-4 rounded-xl resize-none outline-none text-sm leading-relaxed"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#2D2D2B',
                minHeight: '140px',
                border: '1.5px solid #E5E5E5',
                caretColor: '#3A7A8C',
              }}
              placeholder="Start writing here — describe the experience with some detail..."
              value={text}
              onChange={(e) => onChange(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <span className="text-xs" style={{ color: text.trim().length < minChars ? '#B8B5B2' : '#3A7A8C' }}>
                {text.trim().length < minChars
                  ? `${minChars - text.trim().length} more characters needed`
                  : '✓ Looks good'}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={onSubmit}
          disabled={!isValid}
          className="w-full py-3 rounded-xl text-white transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: isPostcard ? '#3A7A8C' : '#2D2D2B' }}
        >
          {isPostcard ? 'Send Postcard →' : 'Continue →'}
        </button>
      </div>
    </div>
  );
}
