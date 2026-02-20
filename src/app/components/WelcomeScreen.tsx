interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12" style={{ backgroundColor: '#F5F2EE' }}>
      <div
        className="w-full max-w-xl rounded-2xl p-10 shadow-sm"
        style={{ backgroundColor: '#F0EFED', border: '1px solid #E5E5E5' }}
      >
        {/* Label */}
        <div className="mb-6">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs tracking-widest uppercase"
            style={{ backgroundColor: '#E8F2F4', color: '#3A7A8C' }}
          >
            Research Study
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-4" style={{ color: '#2D2D2B' }}>
          Welcome
        </h1>

        {/* Description */}
        <p className="mb-6 leading-relaxed" style={{ color: '#2D2D2B' }}>
          This short activity asks you to make a few money choices and answer a quick
          writing prompt. It takes about <span style={{ color: '#3A7A8C', fontWeight: 600 }}>5–7 minutes</span> to complete.
        </p>

        <div
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}
        >
          <p className="text-sm mb-3" style={{ color: '#7A7672' }}>
            <span style={{ color: '#2D2D2B', fontWeight: 600 }}>What you'll do:</span>
          </p>
          <ol className="space-y-2 text-sm" style={{ color: '#7A7672' }}>
            <li className="flex gap-3 items-start">
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                style={{ backgroundColor: '#3A7A8C', color: '#fff', fontWeight: 600 }}
              >
                1
              </span>
              <span>Make a few quick money choices — there's no right or wrong answer.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                style={{ backgroundColor: '#3A7A8C', color: '#fff', fontWeight: 600 }}
              >
                2
              </span>
              <span>Complete a short writing prompt.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                style={{ backgroundColor: '#3A7A8C', color: '#fff', fontWeight: 600 }}
              >
                3
              </span>
              <span>Make the same choices again and see how your responses compare.</span>
            </li>
          </ol>
        </div>

        <button
          onClick={onStart}
          className="w-full py-3 rounded-xl text-white transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
          style={{ backgroundColor: '#2D2D2B' }}
        >
          Start Activity
        </button>
      </div>
    </div>
  );
}
