interface ReflectionScreenProps {
  group: 'A' | 'B';
  text: string;
  onChange: (text: string) => void;
  onDone: () => void;
}

export function ReflectionScreen({ group, text, onChange, onDone }: ReflectionScreenProps) {
  const isPostcard = group === 'A';

  const examples = isPostcard
    ? [
        'Studying 30 minutes earlier than you normally would',
        'Setting $5 aside instead of spending it right now',
        'Going to bed earlier so tomorrow-you feels rested',
        'Sending a message you\'ve been putting off',
      ]
    : [
        'Preparing something the night before instead of the morning of',
        'Choosing the option that takes a bit more effort but pays off later',
        'Starting on something you\'ve been procrastinating on',
        'Saving a small amount instead of spending it impulsively',
      ];

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
            Step 5: Reflection
          </span>
        </div>

        <h2 className="mb-2" style={{ color: '#2D2D2B' }}>
          {isPostcard
            ? 'One Small Thing for Future You'
            : 'One Thing Future You Would Appreciate'}
        </h2>

        <p className="mb-6 text-sm leading-relaxed" style={{ color: '#7A7672' }}>
          {isPostcard
            ? 'What is one small, concrete thing you could do this week that your future self would thank you for?'
            : "Even though today's activity was just a demo, what is one small thing you might do this week that future you would appreciate?"}
        </p>

        {/* Examples */}
        <div
          className="rounded-xl p-4 mb-6"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}
        >
          <p className="text-xs mb-3" style={{ color: '#7A7672', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Some ideas:
          </p>
          <ul className="space-y-1.5">
            {examples.map((ex, i) => (
              <li key={i} className="flex gap-2 items-start text-sm" style={{ color: '#7A7672' }}>
                <span style={{ color: '#3A7A8C' }}>·</span>
                <span>{ex}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Input */}
        <div className="mb-8">
          <textarea
            className="w-full px-5 py-4 rounded-xl resize-none outline-none text-sm leading-relaxed"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#2D2D2B',
              minHeight: '100px',
              border: '1.5px solid #E5E5E5',
              caretColor: '#3A7A8C',
            }}
            placeholder="Write one small thing you could do this week..."
            value={text}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        <button
          onClick={onDone}
          className="w-full py-3 rounded-xl text-white transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
          style={{ backgroundColor: '#2D2D2B' }}
        >
          Done
        </button>
      </div>
    </div>
  );
}